import { Subject } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { MessageReader, GetAllTilesMessage, ReturnAllTilesMessage, TileBase, MessageType } from '../../../infotainment-pi-core/core';
import { $WebSocket } from "angular2-websocket/angular2-websocket";

@Injectable()
export class InfotainmentPiClientService {

  allTilesSubject: Subject<TileBase[]> = new Subject<TileBase[]>();

  constructor(private ws: $WebSocket, private messageReader: MessageReader) {
    ws.onMessage(
      (msg: MessageEvent) => {
        let message = this.messageReader.getMessage(msg.data);
        let allTilesMessage = message as ReturnAllTilesMessage;
        if(allTilesMessage != null && allTilesMessage.type == MessageType.allTiles)
          this.allTilesSubject.next(allTilesMessage.tiles);
      },
      { autoApply: false }
    );
  }

  askForAllTiles() {
    this.ws.send(new GetAllTilesMessage()).subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      })
  }
}
