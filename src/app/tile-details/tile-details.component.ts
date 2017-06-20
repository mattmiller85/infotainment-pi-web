import { TileBase, TileType } from '../../../../infotainment-pi-core/core';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'tile-details',
  templateUrl: './tile-details.component.html',
  styleUrls: ['./tile-details.component.css']
})
export class TileDetailsComponent implements OnInit, OnDestroy {

  TileType = TileType;
  tile: TileBase;
  current_duration: number = 0;
  current_value: number = 0;

  private _paramSub: Subscription;
  private _tileSub: Subscription;

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute) { }

  ngOnInit() {    
    this._paramSub = this.route.params.subscribe(params => {
      this._tileSub = this.service.updatesFor(Number(params['id'])).subscribe(message => {
        this.tile = message.tile;
      });
      this.service.getTileById(Number(params['id']));
    });
  }

  ngOnDestroy() {
    this._paramSub.unsubscribe();
    this._tileSub.unsubscribe();
  }
}
