import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PositionAbbrs } from '../models/lookups/position-abbrs';
import { PlayerViewModel } from '../models/player-view.model';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends HttpService {
  private fetchedData: PlayerViewModel;
  private teamId: string;
  private playerName: string;

  getPlayer(playerName: string): Observable<PlayerViewModel> {
    if (this.playerName !== playerName || !this.fetchedData) {
      this.fetchedData = this.findPlayer(playerName);
    }
    return of(this.fetchedData);
  }

  updatePlayer(player: PlayerViewModel): Observable<PlayerViewModel> {
    const teams = [...this.rawData.teams];
    const teamIndex = teams.findIndex((t) => t.id === this.teamId);
    const teamRosters = [...teams[teamIndex].roster];
    const rosterIndex = teamRosters.findIndex((r) => r.person.displayName === this.playerName);

    teamRosters[rosterIndex] = {
      ...teamRosters[rosterIndex],
      positionAbbr: PositionAbbrs[player.position] || player.positionAbbr,
      depthOrder: player.depthOrder,
      unit: player.unit,
      position: player.position,
      person: { displayName: player.displayName }
    };

    this.rawData.teams[teamIndex] = {
      ...this.rawData.teams[teamIndex],
      roster: [...teamRosters]
    };

    this.rawData.isDirty = true;

    return of(player);
  }

  private findPlayer(playerName: string): PlayerViewModel {
    for (const team of this.rawData.teams) {
      const player = team.roster.find((r) => r.person.displayName === playerName);
      if (player) {
        this.teamId = team.id;
        this.playerName = player.person.displayName;

        return {
          displayName: player.person.displayName,
          position: player.position,
          unit: player.unit,
          positionAbbr: player.positionAbbr,
          depthOrder: player.depthOrder
        };
      }
    }
  }
}
