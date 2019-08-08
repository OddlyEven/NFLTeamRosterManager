import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerEditComponent } from './player-edit/player-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule {}
