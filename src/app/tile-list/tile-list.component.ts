import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileBase } from '../../../../infotainment-pi-core/core';

@Component({
  selector: 'tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.css']
})
export class TileListComponent implements OnInit {

  tiles: any[] = [];

  constructor(private service: InfotainmentPiClientService) { }

  ngOnInit() {
    this.service.allTilesSubject.subscribe(tiles => { this.tiles.length = 0; tiles.forEach(tile => { debugger;this.tiles.push({}); }); } );
    this.service.askForAllTiles();
  }

}
