import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileBase } from '../../../../infotainment-pi-core/core';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() tile: TileBase;

  constructor() { }

  ngOnInit() {
  }

}
