import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Subscription } from 'rxjs/Rx';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TileBase, TileType, MessageType } from '../../../../infotainment-pi-core/core';

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

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute, private router: Router) {
    this.keys = Object.keys(this.tileTypes).filter(Number);
  }

  ngOnInit() {
    this._paramSub = this.route.params.subscribe(params => {

      this.service.tileSetSubject.subscribe((msg) => {
        if (!this.tile.id || msg.tile.id === this.tile.id) {
          this.router.navigate(['']);
        }
      });

      // tslint:disable-next-line:curly
      if (!params['id']) {
        this.tile = TileBase.getTile(Number(this.selectedType || TileType.single_audio_file));
        return;
      }

      this._tileSub = this.service.updatesFor(Number(params['id'])).subscribe(message => {
        if (message.type === MessageType.returnTile) {
          this.tile = message.tile;
          this.selectedType = Number(this.tile.type);
        }
      });
      this.service.getTileById(Number(params['id']));
    });
  }

  setTile() {
    this.tile = TileBase.getTile(Number(this.selectedType), this.tile);
    this.service.setTile(this.tile);
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

  }
}
