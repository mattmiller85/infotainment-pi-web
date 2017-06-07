import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit {

  lastMessage: string = "Connecting...";

  constructor(private service: InfotainmentPiClientService) { 
    service.greetingMessageSubject.subscribe(gm => this.lastMessage = "You're connected to InfotainmentPi!");
    service.connectionClosedSubject.subscribe(msg => this.lastMessage = msg.message);
  }

  ngOnInit() {
    
  }

}
