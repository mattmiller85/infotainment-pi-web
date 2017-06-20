import { TileBase } from '../../../../infotainment-pi-core/core';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.css']
})
export class TileListComponent implements OnInit {

  tiles: Array<TileBase> = [];

  constructor(private service: InfotainmentPiClientService, private router: Router) {
    this.tiles = new Array<any>();
    this.service.allTilesSubject.subscribe(tls => {
        this.tiles.length = 0;
        tls.forEach(t => this.tiles.push(t));
    });
  }

  ngOnInit() {
    this.service.askForAllTiles();
  }

  navigateToTile(tile: TileBase){
    this.router.navigate(["tile", tile.id]);
  }
}
