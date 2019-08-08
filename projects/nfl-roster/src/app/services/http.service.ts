import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NflBaseService } from './nfl-base.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl: string;

  constructor(protected http: HttpClient, protected nflBaseService: NflBaseService) {
    this.apiUrl = environment.apiUrl;
  }

  set rawData(value) {
    this.nflBaseService.rawData = value;
  }

  get rawData(): Observable<any> {
    if (this.nflBaseService.rawData === null) {
      return this.http
                 .get('assets/data/data.json')
                 .pipe(
                   map(data => {
                     this.nflBaseService.rawData = data;
                     return this.nflBaseService.rawData;
                   })
                 );
    } else {
      return of(this.nflBaseService.rawData);
    }
  }
}
