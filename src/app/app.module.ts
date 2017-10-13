import { MessageReader } from '../../../infotainment-pi-core/core';
import { AddUpdateTileComponent } from './add-update-tile/add-update-tile.component';
import { AppComponent } from './app.component';
import { InfotainmentPiClientService } from './infotainment-pi-client.service';
import { MessageDisplayComponent } from './message-display/message-display.component';
import { ObdReadingTileSmallComponent } from './obd-reading-tile-small/obd-reading-tile-small.component';
import { ObdReadingTileComponent } from './obd-reading-tile/obd-reading-tile.component';
import {
  SingleAudioFileTileSmallComponent
} from './single-audio-file-tile-small/single-audio-file-tile-small.component';
import { SingleAudioFileTileComponent } from './single-audio-file-tile/single-audio-file-tile.component';
import { TileDetailsComponent } from './tile-details/tile-details.component';
import { TileListComponent } from './tile-list/tile-list.component';
import { TileComponent } from './tile/tile.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TileRemoveComponent } from './tile-remove/tile-remove.component';
import { HomeHeaderLinkComponent } from './home-header-link/home-header-link.component';

const appRoutes: Routes = [
  {
    path: 'tile/:id',
    component: TileDetailsComponent
  },
  {
    path: 'tile-add',
    component: AddUpdateTileComponent
  },
  {
    path: 'tile-update/:id',
    component: AddUpdateTileComponent
  },
  {
    path: 'tile-remove/:id',
    component: TileRemoveComponent
  },
  {
    path: 'tile-list',
    component: TileListComponent
  },
  {
    path: '',
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
    SingleAudioFileTileComponent,
    SingleAudioFileTileSmallComponent,
    ObdReadingTileSmallComponent,
    ObdReadingTileComponent,
    AddUpdateTileComponent,
    TileRemoveComponent,
    HomeHeaderLinkComponent
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
