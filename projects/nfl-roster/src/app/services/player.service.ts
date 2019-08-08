import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this
      .rawData
      .pipe(
        map(rawData => {
          if (this.playerName !== playerName || !this.fetchedData) {
            for (const team of rawData.teams) {
              const player = team.roster.find((r) => r.person.displayName === playerName);
              if (player) {
                this.teamId = team.id;
                this.playerName = player.person.displayName;

                this.fetchedData = {
                  displayName: player.person.displayName,
                  position: player.position,
                  unit: player.unit,
                  positionAbbr: player.positionAbbr,
                  depthOrder: player.depthOrder
                };
              }
            }
            return this.fetchedData;
          } else {
            return this.fetchedData;
          }
        })
      );
  }

  updatePlayer(player: PlayerViewModel): Observable<PlayerViewModel> {
    return this
      .rawData
      .pipe(
        map(data => {
          const modifiedData = { ...data };
          const teams = [...modifiedData.teams];
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

          modifiedData.teams[teamIndex] = {
            ...modifiedData.teams[teamIndex],
            roster: [...teamRosters]
          };

          modifiedData.isDirty = true;
          this.rawData = modifiedData;
          return player;
        })
      );
  }
}
