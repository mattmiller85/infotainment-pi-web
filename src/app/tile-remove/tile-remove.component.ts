import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TileBase, MessageType } from '../../../../infotainment-pi-core/core';
import { InfotainmentPiClientService } from 'app/infotainment-pi-client.service';

@Component({
  selector: 'tile-remove',
  templateUrl: './tile-remove.component.html',
  styleUrls: ['./tile-remove.component.css']
})
export class TileRemoveComponent implements OnInit, OnDestroy {

  tile: TileBase;
  current_duration: number = 0;
  current_value: number = 0;

  private _paramSub: Subscription;
  private _tileSub: Subscription;

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._paramSub = this.route.params.subscribe(params => {
      this._tileSub = this.service.onTileMessage(Number(params['id']), MessageType.returnTile).subscribe(message => {
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
