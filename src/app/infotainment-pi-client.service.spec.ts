import { TestBed, inject } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { InfotainmentPiClientService } from './infotainment-pi-client.service';
import { MessageReader } from '../../../infotainment-pi-core/core';
import { $WebSocket } from "angular2-websocket/angular2-websocket";

describe('InfotainmentPiClientService', () => {

  beforeEach(() => {    
    TestBed.configureTestingModule({
      providers: [{ provide: $WebSocket, useValue: new $WebSocket("ws://localhost:12345") }, MessageReader, InfotainmentPiClientService]
    });
  });

  it('should ...', inject([$WebSocket, MessageReader, InfotainmentPiClientService], 
    (socket: $WebSocket, reader: MessageReader, service: InfotainmentPiClientService) => {
    expect(socket).toBeTruthy();
    expect(reader).toBeTruthy();
    expect(service).toBeTruthy();
  }));


});
