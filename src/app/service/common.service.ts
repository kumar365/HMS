import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constant/app-constants';
import { Country } from '../model/country';
import { State } from '../model/state';
import { City } from '../model/city';
import { User } from '../model/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TestDetails } from '../model/test-details';
import { ApiResponse } from '../model/api-response';
import { Appointment } from '../model/appointment';
import { Ambulance } from '../model/ambulance';
import { Staffing } from '../model/staffing';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  public findCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(AppConstants.GET_COUNTRIES, httpOptions);
  }
  public findStates(): Observable<State[]> {
    return this.httpClient.get<State[]>(AppConstants.GET_STATES, httpOptions);
  }
  public findStatesByCountryId(countryId: number): Observable<State[]> {
    return this.httpClient.get<State[]>(AppConstants.GET_STATES_BY_ID + countryId, httpOptions);
  }
  public findCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(AppConstants.GET_DISTRICTS, httpOptions);
  }
  public findCitiesByStateId(stateId: number): Observable<City[]> {
    return this.httpClient.get<City[]>(AppConstants.GET_DISTRICTS_BY_ID + stateId, httpOptions);
  }
  public getDoctorsList(): Observable<User[]> {
    return this.httpClient.get<User[]>(AppConstants.GET_DOCTOR_LIST, httpOptions);
  }

  public getDoctorsListConditional(todayFlag: boolean): Observable<User[]> {
    return this.httpClient.get<User[]>(AppConstants.GET_DOCTOR_LIST, httpOptions);
  }

  getDoctorById(id: any): Observable<User> {
    return this.httpClient.get<User>(AppConstants.GET_DOCTOR_BY_ID + id, httpOptions);
  }
  getAmbulanceList(): Observable<Ambulance[]> {
    return this.httpClient.get<Ambulance[]>(AppConstants.GET_AMBULANCES, httpOptions);
  }
  getTestDetailsList(): Observable<TestDetails[]> {
    return this.httpClient.get<TestDetails[]>(AppConstants.GET_TEST_DETAILS_LIST, httpOptions);
  }
  getTestDetails(id: number): Observable<TestDetails> {
    return this.httpClient.get<TestDetails>(AppConstants.GET_TEST_DETAILS + id, httpOptions);
  }
  sendUserQuestion(form: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(AppConstants.SEND_USER_QUESTION, {
      name: form.name,
      email: form.email,
      yourQuestion: form.yourQuestion
    }, httpOptions);
  }
  public saveAppointment(appointment: Appointment): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_APPOINTMENT, appointment, httpOptions);
  }
  sendStaffingData(staffing: Staffing): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(AppConstants.SEND_STAFFFING_DATA, staffing, httpOptions);
  }
  sendStaffingDataWithFile(staffing: Staffing): Observable<ApiResponse> {
    const formData: FormData = new FormData();
    formData.append('file', staffing.file);
    formData.append('staffing', new Blob([JSON.stringify(staffing)], {
      type: 'application/json'
    }));
    return this.httpClient.post<ApiResponse>(AppConstants.SEND_STAFFFING_DATA_FILE, formData);
  }
}
