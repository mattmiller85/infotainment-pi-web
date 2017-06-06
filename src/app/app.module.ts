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
import { TileDetailsComponent } from './tile-details/tile-details.component';
import { SingleAudioFileTileComponent } from './single-audio-file-tile/single-audio-file-tile.component';

const appRoutes: Routes = [
  { 
    path: 'tile/:id', 
    component: TileDetailsComponent },
  {
    path: 'tile-list',
    component: TileListComponent
  },
  { path: '',
    redirectTo: 'tile-list',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TileListComponent,
    TileComponent,
    MessageDisplayComponent,
    TileDetailsComponent,
    SingleAudioFileTileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MessageReader, InfotainmentPiClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
