import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamDetailViewModel } from '../../models/team-detail-view.model';

@Component({
  selector: 'nfl-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent {

  @Input() team: TeamDetailViewModel;
  @Output() teamDetailClickEvent = new EventEmitter<string>();

  constructor() {
  }

  onTeamDetailClick(id: string): void {
    this.teamDetailClickEvent.emit(id);
  }
}
