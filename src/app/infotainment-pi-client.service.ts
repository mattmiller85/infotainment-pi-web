import { ReadyState } from '@angular/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { MessageReader, MessageBase, GetAllTilesMessage, ReturnAllTilesMessage, GetTileByIdMessage, ReturnTileMessage, TileBase, MessageType } from '../../../infotainment-pi-core/core';

@Injectable()
export class InfotainmentPiClientService {

  private ws: WebSocket;
  private _batchedTasks: Array<MessageBase> = new  Array<MessageBase>();

  allTilesSubject: Subject<TileBase[]> = new Subject<TileBase[]>();
  tileSubject: Subject<TileBase> = new Subject<TileBase>();

  constructor(private messageReader: MessageReader) {
    this.ws = new WebSocket(environment.wsUrl);
    this.ws.onmessage = 
      (msg: MessageEvent) => {
        let message = this.messageReader.getMessage(msg.data);
        let allTilesMessage = message as ReturnAllTilesMessage;
        if(allTilesMessage != null && allTilesMessage.type == MessageType.allTiles){
          this.allTilesSubject.next(allTilesMessage.tiles);
          return;
        }
        let tileMessage = message as ReturnTileMessage;
        if(tileMessage != null && tileMessage.tile != null)
          this.tileSubject.next(tileMessage.tile);
      };
    this.ws.onopen = (e: MessageEvent) => {
        this._batchedTasks.forEach(msg => {
          this.ws.send(JSON.stringify(msg));
        });
        this._batchedTasks.length = 0;
    };
  }

  private batchOrSendMessage<T extends MessageBase>(message: T){
    if(this.ws.readyState != ReadyState.Open){
      this._batchedTasks.push(message);      
    }else{
      this.ws.send(JSON.stringify(message));
    }
  }

  askForAllTiles() {
    this.batchOrSendMessage(new GetAllTilesMessage());
  }

  getTileById(id: number) {
    this.batchOrSendMessage(new GetTileByIdMessage(id));
  }
}
