import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit {

  constructor(private service: InfotainmentPiClientService) { }

  ngOnInit() {
  }

}
