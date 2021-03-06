import * as core from '../../../infotainment-pi-core/core';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { ReadyState } from '@angular/http';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

@Injectable()
export class InfotainmentPiClientService {

  allTilesSubject: Subject<core.TileBase[]> = new Subject<core.TileBase[]>();
  greetingMessageSubject: Subject<core.GreetingMessage> = new Subject<core.GreetingMessage>();
  connectionClosedSubject: Subject<{ message: string, actions?: Array<{ action: Function, text: string }> }> = new Subject();
  playerStatusSubject: Subject<{ status: string, duration: number }> = new Subject();
  tileSetSubject = new Subject<core.TileUpdatedMessage>();

  private ws: WebSocket;
  private _batchedTasks: Array<core.MessageBase> = new Array<core.MessageBase>();

  private tileUpdates: Map<number, Subject<{ type: core.MessageType, tile?: core.TileBase }>> =
  new Map<number, Subject<{ type: core.MessageType, tile?: core.TileBase }>>();

  private retryInterval: Subscription;

  updatesFor(tile: core.TileBase | number): Subject<{ type: core.MessageType, tile?: core.TileBase }>
  updatesFor(tileThing: any): Subject<{ type: core.MessageType, tile?: core.TileBase }> {
    let tileId = 0;
    if (typeof (tileThing) === 'number') {
      tileId = tileThing;
    }
    if (typeof (tileThing) === 'object') {
      tileId = tileThing.id;
    }
    let updates = this.tileUpdates.get(tileId);
    if (!updates) {
      updates = new Subject<{ type: core.MessageType, tile?: core.TileBase }>();
      this.tileUpdates.set(tileId, updates);
    }
    return updates;
  }

  onTileMessage(tileId: number, messageType: core.MessageType): Observable<{ type: core.MessageType, tile?: core.TileBase }> {
    const subj = new Subject<{ type: core.MessageType, tile?: core.TileBase }>();
    this.updatesFor(tileId).subscribe(message => {
      if (message.type != messageType) {
        return;
      }
      subj.next(message);
    });
    return subj;
  }

  constructor(private messageReader: core.MessageReader) {
    this.configureSocket();
  }

  configureSocket() {
    this.ws = new WebSocket(environment.wsUrl);
    this.ws.onmessage =
      (msg: MessageEvent) => {
        const message = (this.messageReader == null ? new core.MessageReader() : this.messageReader).getMessage(msg.data);
        const allTilesMessage = message as core.ReturnAllTilesMessage;
        if (allTilesMessage != null && allTilesMessage.type === core.MessageType.allTiles) {
          // go ahead and new up the observables so they're ready for subscriptions for each of the tiles
          allTilesMessage.tiles.forEach(tile => this.tileUpdates.set(tile.id, new Subject<{ tile?: core.TileBase }>()));
          this.allTilesSubject.next(allTilesMessage.tiles);
          return;
        }

        const tileMessage = message as core.ReturnTileMessage;
        if (tileMessage && tileMessage.tile != null && tileMessage.type === core.MessageType.returnTile) {
          this.tileUpdates.get(tileMessage.tile.id).next(tileMessage);
          return;
        }

        const greetingMessage = message as core.GreetingMessage;
        if (greetingMessage && tileMessage.type === core.MessageType.greetingFromServer) {
          this.greetingMessageSubject.next(greetingMessage);
          return;
        }

        const playerStatusMessage = message as core.SongStatusMessage;
        if (playerStatusMessage && playerStatusMessage.type === core.MessageType.songStatus) {
          this.tileUpdates.get(playerStatusMessage.tile.id).next(playerStatusMessage);
          this.playerStatusSubject.next({
            status: `${playerStatusMessage.tile.name} ${playerStatusMessage.durationPlaying === -1 ?
              'stopped' : playerStatusMessage.durationPlaying.toString()}.`, duration: playerStatusMessage.durationPlaying
          });
          return;
        }

        const obdReadingMessage = message as core.OBDReadingMessage;
        if (obdReadingMessage && obdReadingMessage.type === core.MessageType.obdReading) {
          const subj = this.tileUpdates.get(obdReadingMessage.tile.id);
          if (!subj) {
            return;
          }
          subj.next(obdReadingMessage);
          return;
        }

        const tileSetMessage = message as core.TileUpdatedMessage;
        if (tileSetMessage && tileSetMessage.type === core.MessageType.tileUpdated) {
          this.tileSetSubject.next(tileSetMessage);
        }
      };
    this.ws.onclose = () => {
      this.connectionClosedSubject.next({
        message: 'Connection lost...', actions: [{
          action: () =>
            this.configureSocket(), text: 'Retry'
        }]
      });
    };
    this.ws.onopen = (e: MessageEvent) => {
      if (this.retryInterval != null) {
        this.retryInterval.unsubscribe();
      }
      this._batchedTasks.forEach(msg => {
        this.ws.send(JSON.stringify(msg));
      });
      this._batchedTasks.length = 0;
      this.askForAllTiles();
    };
  }

  private batchOrSendMessage<T extends core.MessageBase>(message: T) {
    if (this.ws.readyState !== ReadyState.Open) {
      this._batchedTasks.push(message);
    } else {
      this.ws.send(JSON.stringify(message));
    }
  }

  askForAllTiles() {
    this.batchOrSendMessage(new core.GetAllTilesMessage());
  }

  setTile(tile: core.TileBase) {
    this.batchOrSendMessage(new core.AddUpdateTileMessage(tile));
  }

  getTileById(id: number) {
    this.batchOrSendMessage(new core.GetTileByIdMessage(id));
  }

  playAudioFile(tile: { path_to_audio: string, id: number }) {
    this.batchOrSendMessage(new core.PlayAudioFileMessage(tile));
  }

  pauseAudioFile() {
    this.batchOrSendMessage(new core.PauseCurrentAudioFileMessage());
  }

  stopAudioFile() {
    this.batchOrSendMessage(new core.StopCurrentAudioFileMessage());
  }
}
