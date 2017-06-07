import { ReadyState } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import * as core from '../../../infotainment-pi-core/core';

@Injectable()
export class InfotainmentPiClientService {

  private ws: WebSocket;
  private _batchedTasks: Array<core.MessageBase> = new  Array<core.MessageBase>();

  allTilesSubject: Subject<core.TileBase[]> = new Subject<core.TileBase[]>();
  tileSubject: Subject<core.TileBase> = new Subject<core.TileBase>();
  greetingMessageSubject: Subject<core.GreetingMessage> = new Subject<core.GreetingMessage>();
  connectionClosedSubject: Subject<{message:string}> = new Subject<{message:string}>();

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
          this.allTilesSubject.next(allTilesMessage.tiles);
          return;
        }
        let tileMessage = message as core.ReturnTileMessage;
        if(tileMessage != null && tileMessage.tile != null){
          this.tileSubject.next(tileMessage.tile);
          return;
        }
        let greetingMessage = message as core.GreetingMessage;
        if(greetingMessage != null){
          this.greetingMessageSubject.next(greetingMessage);
          return;
        } 
      };
    this.ws.onclose = () => {
      this.connectionClosedSubject.next({ message: "Connection lost, retrying..." });
      this.retryInterval = Observable.timer(0, 5000).subscribe(t => this.configureSocket());
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
