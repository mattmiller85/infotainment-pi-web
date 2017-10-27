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

  //tiles: Array<TileBase> = [];
  tileChunks = new Array<TileBase[]>();
  private perRow = 4;

  constructor(private service: InfotainmentPiClientService, private router: Router) {

    this.service.allTilesSubject.subscribe(tls => {
        this.tileChunks.length = 0;
        let chunkEnd = this.perRow;
        let chunkStart = 0;
        let chunk = tls.slice(chunkStart, chunkEnd);
        this.tileChunks.push(chunk);
        while (chunk && chunk.length > 0 && chunkStart <= tls.length) {
          chunkStart = chunkEnd;
          chunkEnd = chunkEnd + this.perRow;
          chunk = tls.slice(chunkStart, chunkEnd);
          const shortTiles = this.perRow - chunk.length;
          if (shortTiles < 4) {
            for (let i = 0; i < shortTiles; i++) {
              chunk.push(null);
            }
            this.tileChunks.push(chunk);
          }
        }

    });
  }

  ngOnInit() {
    this.service.askForAllTiles();
  }

  navigateToTile(tile: TileBase) {
    this.router.navigate(['tile', tile.id]);
  }
}
