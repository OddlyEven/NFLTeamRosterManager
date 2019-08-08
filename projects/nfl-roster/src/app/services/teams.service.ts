import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeamDetailViewModel } from '../models/team-detail-view.model';

import { TeamListViewModel } from '../models/team-list-view.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends HttpService {
  private fetchedData: TeamListViewModel;

  getAllTeams(): Observable<TeamListViewModel> {
    if (!this.fetchedData) {
      const teams: TeamDetailViewModel[] = this.rawData.teams.map((data) => {
        return {
          id: data.id,
          fullname: data.fullName,
          name: data.name,
          nickname: data.nickName,
          avatarSrc: `../../../assets/images/logos/${ data.abbr.toLowerCase() }.png`,
          playerCount: data.roster.length || 0
        };
      });

      this.fetchedData = { items: teams };
    }

    return of(this.fetchedData);
  }
}
