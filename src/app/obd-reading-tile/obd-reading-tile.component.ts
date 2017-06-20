import {
    DigitalOBDIISensorTile,
    MessageType,
    OBDReadingMessage,
    TileType
} from '../../../../infotainment-pi-core/core';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'obd-reading-tile',
  templateUrl: './obd-reading-tile.component.html',
  styleUrls: ['./obd-reading-tile.component.css']
})
export class ObdReadingTileComponent implements OnInit {

  @Input() tile: DigitalOBDIISensorTile = new DigitalOBDIISensorTile();
  private _tileSub: Subscription;
  @Input() current_value: number = 0;

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._tileSub = this.service.updatesFor(this.tile).subscribe(message => {
      if(message.type == MessageType.obdReading && this.tile.type == TileType.digital_obd_ii_sensor){
        if(this.tile.id == message.tile.id){
          this.current_value = (message as OBDReadingMessage).value;
        }
      }
    });
    
  }

}
