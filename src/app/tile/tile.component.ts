import { TileBase, TileType } from '../../../../infotainment-pi-core/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent<T extends TileBase> implements OnInit {

  public TileType = TileType;

  @Input() tile: T;

  constructor() { }

  ngOnInit() {
  }

}
