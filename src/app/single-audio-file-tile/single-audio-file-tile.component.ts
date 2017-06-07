import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { TileType, SingleAudioFileTile } from '../../../../infotainment-pi-core/core';

@Component({
  selector: 'single-audio-file-tile',
  templateUrl: './single-audio-file-tile.component.html',
  styleUrls: ['./single-audio-file-tile.component.css'],  
})
export class SingleAudioFileTileComponent implements OnInit {

  @Input() tile: SingleAudioFileTile = new SingleAudioFileTile();
  
  constructor(private service: InfotainmentPiClientService) { }
  
  ngOnInit() {
  }

  play(){
    this.service.playAudioFile(this.tile);
  }
}
