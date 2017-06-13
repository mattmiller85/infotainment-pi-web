import { Subscription } from 'rxjs/Rx';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit, OnDestroy {

  lastMessage: string = "Connecting...";
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(private service: InfotainmentPiClientService) { 
    
  }

  private subscribe(func: () => Subscription){
    this.subscriptions.push(func());
  }

  ngOnInit() {
    this.subscribe(() => this.service.greetingMessageSubject.subscribe(gm => this.lastMessage = "You're connected to InfotainmentPi!"));
    this.subscribe(() => this.service.connectionClosedSubject.subscribe(msg => this.lastMessage = msg.message));
    this.subscribe(() => this.service.playerStatusSubject.subscribe(msg => this.lastMessage = msg.status));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
