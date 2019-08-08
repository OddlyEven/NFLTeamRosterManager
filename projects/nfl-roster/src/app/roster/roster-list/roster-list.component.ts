import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RosterListViewModel } from '../../models/roster-list-view.model';
import { RosterService } from '../../services/roster.service';

@Component({
  selector: 'nfl-roster-list',
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss']
})
export class RosterListComponent implements OnInit {
  rosterViewModel: RosterListViewModel;
  teamId: string;

  constructor(private rosterService: RosterService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teamId = params.get('teamId');

      this.rosterService.getAllPlayers(this.teamId)
          .subscribe(data => this.rosterViewModel = data);
    });
  }

  onPlayerClick(playerName: string): void {
    this.router.navigate(['teams', this.teamId, 'players', playerName]);
  }
}
