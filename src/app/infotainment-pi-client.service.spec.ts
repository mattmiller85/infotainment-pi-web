import { TestBed, inject } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { InfotainmentPiClientService } from './infotainment-pi-client.service';
import { MessageReader } from '../../../infotainment-pi-core/core';

describe('InfotainmentPiClientService', () => {

  beforeEach(() => {    
    TestBed.configureTestingModule({
      providers: [MessageReader, InfotainmentPiClientService]
    });
  });

  it('should ...', inject([MessageReader, InfotainmentPiClientService], 
    (reader: MessageReader, service: InfotainmentPiClientService) => {
    expect(reader).toBeTruthy();
    expect(service).toBeTruthy();
  }));


});
