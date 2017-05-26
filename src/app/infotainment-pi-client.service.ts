import { Injectable, Inject } from '@angular/core';
import { MessageReader, GetAllTilesMessage } from '../../../infotainment-pi-core/core';
import { $WebSocket } from "angular2-websocket/angular2-websocket";

@Injectable()
export class InfotainmentPiClientService {

  constructor(private ws: $WebSocket, private messageReader: MessageReader) {
    ws.onMessage(
      (msg: MessageEvent) => {
        let message = this.messageReader.getMessage(msg.data);
        console.log(`Received: ${typeof message}`);
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
