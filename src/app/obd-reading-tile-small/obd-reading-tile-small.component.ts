import { DigitalOBDIISensorTile, MessageType, OBDReadingMessage } from '../../../../infotainment-pi-core/core';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'obd-reading-tile-small',
  templateUrl: './obd-reading-tile-small.component.html',
  styleUrls: ['./obd-reading-tile-small.component.css']
})
export class ObdReadingTileSmallComponent implements OnInit, OnDestroy {

  @Input() tile: DigitalOBDIISensorTile = new DigitalOBDIISensorTile();
  private _tileSub: Subscription;
  currentValue: number = 0;

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._tileSub = this.service.updatesFor(this.tile).subscribe(message => {
      if(message.type == MessageType.obdReading)
      {
        this.currentValue = (message as OBDReadingMessage).value;
      }
    });
  }

  ngOnDestroy() {
    this._tileSub.unsubscribe();
  }

}
