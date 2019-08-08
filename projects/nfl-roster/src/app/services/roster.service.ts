import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerViewModel } from '../models/player-view.model';
import { RosterListViewModel } from '../models/roster-list-view.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RosterService extends HttpService {
  private fetchedData: RosterListViewModel;
  private teamId: string;

  getRosterData(teamId: string): Observable<RosterListViewModel> {
    return this
      .rawData
      .pipe(
        map(rawData => {
          if (this.teamId !== teamId || !this.fetchedData || rawData.isDirty) {
            const team = rawData.teams.find((t) => t.id === teamId);

            this.teamId = teamId;
            rawData.isDirty = false;
            this.rawData = rawData;

            if (team) {
              const players: PlayerViewModel[] =
                team.roster
                    .sort((a, b) => a.position.localeCompare(b.position) || a.depthOrder - b.depthOrder)
                    .map((data) => {
                      return {
                        displayName: data.person.displayName,
                        unit: data.unit,
                        position: data.position,
                        positionAbbr: data.positionAbbr,
                        depthOrder: data.depthOrder
                      };
                    });

              this.fetchedData = {
                teamName: team.fullName,
                items: players
              };
            }

            return this.fetchedData;
          } else {
            return this.fetchedData;
          }
        })
      );
  }
}
