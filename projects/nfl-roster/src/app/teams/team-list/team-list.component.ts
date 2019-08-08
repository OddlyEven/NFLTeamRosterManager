import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamListViewModel } from '../../models/team-list-view.model';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'nfl-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teamsViewModel: TeamListViewModel;

  constructor(private teamsService: TeamsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.teamsService.getAllTeams()
        .subscribe(data => this.teamsViewModel = data);
  }

  onTeamClick(id: string): void {
    this.router.navigate([`teams/${ id }`]);
  }
}
