import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TeamsRoutingModule
  ],
  declarations: [
    TeamListComponent,
    TeamDetailComponent
  ],
})
export class TeamsModule {}
