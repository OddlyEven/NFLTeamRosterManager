import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamDetailViewModel } from '../models/team-detail-view.model';

import { TeamListViewModel } from '../models/team-list-view.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends HttpService {
  private fetchedData: TeamListViewModel;

  getAllTeams(): Observable<TeamListViewModel> {
    return this
      .rawData
      .pipe(
        map(data => {
          if (!this.fetchedData) {
            const teams: TeamDetailViewModel[] = data.teams.map((t) => {
              return {
                id: t.id,
                fullname: t.fullName,
                name: t.name,
                nickname: t.nickName,
                avatarSrc: `../../../assets/images/logos/${ t.abbr.toLowerCase() }.png`,
                playerCount: t.roster.length || 0
              };
            });

            this.fetchedData = { items: teams };
            return this.fetchedData;
          } else {
            return this.fetchedData;
          }
        })
      );
  }
}
