import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlayerViewModel } from '../models/player-view.model';
import { RosterListViewModel } from '../models/roster-list-view.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RosterService extends HttpService {
  private fetchedData: RosterListViewModel;
  private teamId: string;

  getAllPlayers(teamId: string): Observable<RosterListViewModel> {
    if (this.teamId !== teamId || !this.fetchedData || this.rawData.isDirty) {
      const team = this.rawData.teams.find((t) => t.id === teamId);

      this.teamId = teamId;
      this.rawData.isDirty = false;

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
        this.fetchedData = { items: players };
      }
    }

    return of(this.fetchedData);
  }
}
