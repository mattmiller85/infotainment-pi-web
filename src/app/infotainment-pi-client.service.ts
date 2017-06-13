import { ReadyState } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import * as core from '../../../infotainment-pi-core/core';

@Injectable()
export class InfotainmentPiClientService {

  private ws: WebSocket;
  private _batchedTasks: Array<core.MessageBase> = new  Array<core.MessageBase>();

  tileUpdates: Map<number, Subject<{type: core.MessageType, tile?:core.TileBase}>> = new Map<number, Subject<{type: core.MessageType, tile?:core.TileBase}>>(); 

  allTilesSubject: Subject<core.TileBase[]> = new Subject<core.TileBase[]>();
  greetingMessageSubject: Subject<core.GreetingMessage> = new Subject<core.GreetingMessage>();
  connectionClosedSubject: Subject<{message:string}> = new Subject<{message:string}>();
  playerStatusSubject: Subject<{status:string, duration:number}> = new Subject();

  private retryInterval: Subscription;  

  constructor(private messageReader: core.MessageReader) {
    this.configureSocket();
  }

  private configureSocket(){
    this.ws = new WebSocket(environment.wsUrl);
    this.ws.onmessage = 
      (msg: MessageEvent) => {
        let message = this.messageReader.getMessage(msg.data);
        let allTilesMessage = message as core.ReturnAllTilesMessage;
        if(allTilesMessage != null && allTilesMessage.type == core.MessageType.allTiles){
          //go ahead and new up the observables so they're ready for subscriptions for each of the tiles
          allTilesMessage.tiles.forEach(tile => this.tileUpdates.set(tile.id, new Subject<{tile?:core.TileBase}>()));
          this.allTilesSubject.next(allTilesMessage.tiles);
          return;
        }

        let tileMessage = message as core.ReturnTileMessage;
        if(tileMessage != null && tileMessage.tile != null && tileMessage.type == core.MessageType.returnTile){
          this.tileUpdates.get(tileMessage.tile.id).next(tileMessage);
          return;
        }

        let greetingMessage = message as core.GreetingMessage;
        if(greetingMessage != null && tileMessage.type == core.MessageType.greetingFromServer){
          this.greetingMessageSubject.next(greetingMessage);
          return;
        }

        let playerStatusMessage = message as core.SongStatusMessage;
        if(playerStatusMessage != null && playerStatusMessage.type == core.MessageType.songStatus){
          this.tileUpdates.get(playerStatusMessage.tile.id).next(playerStatusMessage);
          this.playerStatusSubject.next({ status: `${playerStatusMessage.tile.name} ${playerStatusMessage.durationPlaying == -1 ? "stopped" : playerStatusMessage.durationPlaying.toString()}.`, duration: playerStatusMessage.durationPlaying });
          return;
        }
      };
    this.ws.onclose = () => {
      //TODO - figure out why the retry has a loop somewhere
      //this.connectionClosedSubject.next({ message: "Connection lost, retrying..." });
      //this.retryInterval = Observable.timer(0, 5000).subscribe(t => this.configureSocket());
    };
    this.ws.onopen = (e: MessageEvent) => {
        if(this.retryInterval != null){
          this.retryInterval.unsubscribe();
        }
        this._batchedTasks.forEach(msg => {
          this.ws.send(JSON.stringify(msg));
        });
        this._batchedTasks.length = 0;
    };
  }

  private batchOrSendMessage<T extends core.MessageBase>(message: T){
    if(this.ws.readyState != ReadyState.Open){
      this._batchedTasks.push(message);      
    }else{
      this.ws.send(JSON.stringify(message));
    }
  }

  askForAllTiles() {
    this.batchOrSendMessage(new core.GetAllTilesMessage());
  }

  getTileById(id: number) {
    this.batchOrSendMessage(new core.GetTileByIdMessage(id));
  }

  playAudioFile(tile: { path_to_audio:string, id: number }){
    this.batchOrSendMessage(new core.PlayAudioFileMessage(tile));
  }

  pauseAudioFile(){
    this.batchOrSendMessage(new core.PauseCurrentAudioFileMessage());
  }

  stopAudioFile(){
    this.batchOrSendMessage(new core.StopCurrentAudioFileMessage());
  }
}
