import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerViewModel } from '../../models/player-view.model';

@Component({
  selector: 'nfl-roster-detail',
  templateUrl: './roster-detail.component.html',
  styleUrls: ['./roster-detail.component.scss']
})
export class RosterDetailComponent implements OnInit {

  @Input() item: PlayerViewModel;
  @Output() rosterDetailClickEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRosterDetailClick(playerName: string): void {
    this.rosterDetailClickEvent.emit(playerName);
  }
}
