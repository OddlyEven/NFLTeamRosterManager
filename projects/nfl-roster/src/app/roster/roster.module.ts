import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RosterDetailComponent } from './roster-detail/roster-detail.component';
import { RosterListComponent } from './roster-list/roster-list.component';
import { RosterRoutingModule } from './roster-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RosterRoutingModule
  ],
  declarations: [
    RosterListComponent,
    RosterDetailComponent
  ]
})
export class RosterModule {}
