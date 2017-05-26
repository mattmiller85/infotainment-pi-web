import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, OnInit } from '@angular/core';
import { TileBase } from '../../../../infotainment-pi-core/core';

@Component({
  selector: 'tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.css']
})
export class TileListComponent implements OnInit {

  tiles: TileBase[];

  constructor(private service: InfotainmentPiClientService) { }

  ngOnInit() {
    this.service.askForAllTiles();
  }

}
