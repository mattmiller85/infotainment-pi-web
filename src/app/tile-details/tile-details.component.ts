import { ActivatedRoute } from '@angular/router';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { TileBase, TileType, SingleAudioFileTile, MessageType, SongStatusMessage } from '../../../../infotainment-pi-core/core';

@Component({
  selector: 'tile-details',
  templateUrl: './tile-details.component.html',
  styleUrls: ['./tile-details.component.css']
})
export class TileDetailsComponent implements OnInit {

  public TileType = TileType;
  tile: TileBase;
  current_duration: number = 0;

  private _paramSub: Subscription;
  private _tileSub: Subscription;  

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute) { }

  ngOnInit() {    
    this._paramSub = this.route.params.subscribe(params => {
      this._tileSub = this.service.tileUpdates.get(Number(params['id'])).subscribe(message => {
        this.tile = message.tile;
        if(message.type == MessageType.songStatus)
        {
          let msg = message as SongStatusMessage;
          this.current_duration = msg.durationPlaying;
        }
      });
      this.service.getTileById(Number(params['id']));
    });
  }

  ngOnDestroy() {
    this._paramSub.unsubscribe();
    this._tileSub.unsubscribe();
  }
}
