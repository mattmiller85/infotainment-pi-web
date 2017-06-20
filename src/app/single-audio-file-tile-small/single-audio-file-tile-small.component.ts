import { MessageType, SingleAudioFileTile, SongStatusMessage } from '../../../../infotainment-pi-core/core';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'single-audio-file-tile-small',
  templateUrl: './single-audio-file-tile-small.component.html',
  styleUrls: ['./single-audio-file-tile-small.component.css']
})
export class SingleAudioFileTileSmallComponent implements OnInit, OnDestroy {

  @Input() tile: SingleAudioFileTile = new SingleAudioFileTile();
  isPlaying: boolean = false;

  private _tileSub: Subscription;

  constructor(private service: InfotainmentPiClientService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._tileSub = this.service.updatesFor(this.tile).subscribe(message => {
      if(message.type == MessageType.songStatus)
      {
        let msg = message as SongStatusMessage;
        this.isPlaying = msg.durationPlaying > 0;
      }
    });
  }

  ngOnDestroy() {
    this._tileSub.unsubscribe();
  }

}
