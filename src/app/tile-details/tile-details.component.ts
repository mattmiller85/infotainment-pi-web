import { ActivatedRoute } from '@angular/router';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { TileBase, TileType, SingleAudioFileTile } from '../../../../infotainment-pi-core/core';

@Component({
  selector: 'tile-details',
  templateUrl: './tile-details.component.html',
  styleUrls: ['./tile-details.component.css']
})
export class TileDetailsComponent implements OnInit {

  public TileType = TileType;
  tile: TileBase;
  private _paramSub: Subscription;

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute) { }

  ngOnInit() {    
    this._paramSub = this.route.params.subscribe(params => {
      this.service.getTileById(params['id']);
      this.service.tileSubject.subscribe(t => {
        if(t.id != params['id'])
          return;
        this.tile = t;
      });
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._paramSub.unsubscribe();
  }
}
