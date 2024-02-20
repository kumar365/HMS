import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constant/app-constants';
import { Country } from '../model/country';
import { State } from '../model/state';
import { City } from '../model/city';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public findCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(AppConstants.GET_COUNTRIES, httpOptions);
  }
  public findStates(countryId: number): Observable<State[]> {
    return this.http.get<State[]>(AppConstants.GET_STATES + countryId, httpOptions);
  }
  public findCities(stateId: number): Observable<City[]> {
    return this.http.get<City[]>(AppConstants.GET_DISTRICTS + stateId, httpOptions);
  }
}
