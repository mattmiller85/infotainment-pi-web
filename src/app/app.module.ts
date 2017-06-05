import { $WebSocket } from 'angular2-websocket';
import { environment } from '../environments/environment';
import { InfotainmentPiClientService } from './infotainment-pi-client.service';
import { MessageReader } from '../../../infotainment-pi-core/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TileListComponent } from './tile-list/tile-list.component';
import { TileComponent } from './tile/tile.component';
import { MessageDisplayComponent } from './message-display/message-display.component';

let ws = new $WebSocket(environment.wsUrl);

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  { path: 'tile/:id',      component: TileComponent },
  {
    path: 'tile-list',
    component: TileListComponent
  },
  { path: '',
    redirectTo: '/tile-list',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TileListComponent,
    TileComponent,
    MessageDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MessageReader, { provide: $WebSocket, useValue: ws }, InfotainmentPiClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
