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
import { MessageResponse } from '../model/message-response';

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

  public getDoctorById(id: any): Observable<User> {
    return this.httpClient.get<User>(AppConstants.GET_DOCTOR_BY_ID + id, httpOptions);
  }
  public getAmbulanceList(): Observable<Ambulance[]> {
    return this.httpClient.get<Ambulance[]>(AppConstants.GET_AMBULANCES, httpOptions);
  }
  public getAmbulanceDetails(id: number): Observable<Ambulance> {
    return this.httpClient.get<Ambulance>(AppConstants.GET_AMBULANCE_DETAILS_BY_ID + id, httpOptions);
  }
  public getTestDetailsList(): Observable<TestDetails[]> {
    return this.httpClient.get<TestDetails[]>(AppConstants.GET_TEST_DETAILS_LIST, httpOptions);
  }
  public getTestDetails(id: number): Observable<TestDetails> {
    return this.httpClient.get<TestDetails>(AppConstants.GET_TEST_DETAILS + id, httpOptions);
  }
  public sendUserQuestion(form: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(AppConstants.SEND_USER_QUESTION, {
      name: form.name,
      email: form.email,
      yourQuestion: form.yourQuestion
    }, httpOptions);
  }
  public saveAppointment(appointment: Appointment): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_APPOINTMENT, appointment, httpOptions);
  }
  public sendStaffingData(staffing: Staffing): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(AppConstants.SEND_STAFFFING_DATA, staffing, httpOptions);
  }
  public sendStaffingDataWithFile(staffing: Staffing): Observable<ApiResponse> {
    const formData: FormData = new FormData();
    formData.append('file', staffing.file);
    formData.append('staffing', new Blob([JSON.stringify(staffing)], {
      type: 'application/json'
    }));
    return this.httpClient.post<ApiResponse>(AppConstants.SEND_STAFFFING_DATA_FILE, formData);
  }
  public saveTetestDetails(testDetails: TestDetails, token: string): Observable<MessageResponse> {
    const formData: FormData = new FormData();
    formData.append('file', testDetails.testImage);
    formData.append('testDetails', new Blob([JSON.stringify(testDetails)], {
      type: 'application/json'
    }));
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_TEST_DETAILS, formData, httpOptions1);
  }
  public findTestDetailsById(id: any, token: string): Observable<TestDetails> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<TestDetails>(AppConstants.GET_TEST_DETAILS_BY_ID + id, httpOptions1);
  }
  public deleteTestDetails(testId: any, token: string): Observable<any> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.delete(AppConstants.DELETE_TEST_DETAILS_BY_ID + testId, httpOptions1);
  }
}
