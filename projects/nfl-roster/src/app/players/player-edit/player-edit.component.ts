import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Positions } from '../../models/lookups/positions';
import { Units } from '../../models/lookups/units';
import { PlayerViewModel } from '../../models/player-view.model';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'nfl-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {
  player: PlayerViewModel;
  // player: Observable<PlayerViewModel>;
  teamId: string;
  playerName: string;
  positions = Positions;
  units = Units;

  constructor(private playerService: PlayerService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teamId = params.get('teamId');
      this.playerName = params.get('playerName');

      this.playerService.getPlayer(this.playerName)
          .subscribe(data => this.player = data);
    });
  }

  onSavePlayerChanges(): void {
    this.playerService.updatePlayer(this.player)
        .subscribe(data => {
          this.router.navigate(['teams', this.teamId]);
        });
  }
}
