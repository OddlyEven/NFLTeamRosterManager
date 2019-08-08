import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RosterListComponent } from './roster-list/roster-list.component';

const routes: Routes = [
  {
    path: '',
    component: RosterListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RosterRoutingModule {}
