import { Router } from '@angular/router';
import { InfotainmentPiClientService } from '../infotainment-pi-client.service';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit, OnDestroy {

  actions: Array<{ action: Function, text: string }>;
  lastMessage = 'Connecting...';
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(private service: InfotainmentPiClientService, private router: Router) {

  }

  private subscribe(func: () => Subscription) {
    this.subscriptions.push(func());
  }

  ngOnInit() {
    this.subscribe(() => this.service.greetingMessageSubject.subscribe(gm => {
      this.lastMessage = 'You\'re connected to InfotainmentPi!'; this.actions = null;
    }));
    this.subscribe(() => this.service.connectionClosedSubject.subscribe(msg => {
      this.lastMessage = msg.message; this.actions = msg.actions;
    }));
    this.subscribe(() => this.service.playerStatusSubject.subscribe(msg => {
      this.lastMessage = msg.status; this.actions = null;
    }));
    this.subscribe(() => this.service.tileSetSubject.subscribe(msg => {
      this.lastMessage = `${msg.tile.name} was ${msg.add_update_type}!`; this.actions = [
        { text: 'Go to tile', action: () => this.router.navigate(['/tile', msg.tile.id]) }
      ];
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
