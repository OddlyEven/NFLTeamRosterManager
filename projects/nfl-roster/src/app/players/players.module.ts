import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayersRoutingModule } from './players-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PlayersRoutingModule
  ],
  declarations: [
    PlayerEditComponent
  ]
})
export class PlayersModule {}
