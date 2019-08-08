import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jsonData } from '../../assets/data/data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl: string;
  public rawData = jsonData;

  constructor(protected http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }
}
