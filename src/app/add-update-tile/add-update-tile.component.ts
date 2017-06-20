import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TileBase, TileType } from '../../../../infotainment-pi-core/core';

@Component({
  selector: 'add-update-tile',
  templateUrl: './add-update-tile.component.html',
  styleUrls: ['./add-update-tile.component.css']
})
export class AddUpdateTileComponent implements OnInit, OnDestroy {

  tile: TileBase;
  tileTypes = TileType;
  keys: string[];
  selectedType: number;

  private _paramSub: Subscription;
  private _tileSub: Subscription;

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute) {
    this.keys = Object.keys(this.tileTypes).filter(Number);
  }

  ngOnInit() {
    this._paramSub = this.route.params.subscribe(params => {
      if(!params['id']) return;
      this._tileSub = this.service.updatesFor(Number(params['id'])).subscribe(message => {
        this.tile = message.tile;
      });
      this.service.getTileById(Number(params['id']));
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
