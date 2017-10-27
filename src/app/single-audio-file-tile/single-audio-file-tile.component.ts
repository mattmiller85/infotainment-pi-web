import { MessageType, SingleAudioFileTile, SongStatusMessage } from '../../../../infotainment-pi-core/core';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'single-audio-file-tile',
  templateUrl: './single-audio-file-tile.component.html',
  styleUrls: ['./single-audio-file-tile.component.css'],  
})
export class SingleAudioFileTileComponent implements OnInit, OnDestroy {

  @Input() tile: SingleAudioFileTile = new SingleAudioFileTile();
  current_progress = 0;
  private _tileSub: Subscription;

  constructor(private service: InfotainmentPiClientService) { }

  ngOnInit() {
    this._tileSub = this.service.updatesFor(this.tile).subscribe(message => {
      if (message.type === MessageType.songStatus) {
        const msg = message as SongStatusMessage;
        this.current_progress = msg.durationPlaying;
      }
    });
  }

  ngOnDestroy() {
    this._tileSub.unsubscribe();
  }

  play(){
    this.service.playAudioFile(this.tile);
  }

  stop(){
    this.service.stopAudioFile();
  }
}
