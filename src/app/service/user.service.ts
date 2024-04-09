import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AppConstants } from '../constant/app-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageResponse } from '../model/message-response';
import { UserInfo } from '../model/user-info';
import { Dependent } from '../model/dependent';
import { ApiResponse } from '../model/api-response';
import { MedicalDetails } from '../model/medical-details';
import { MedicalRecords } from '../model/medical-records';
import { Ambulance } from '../model/ambulance';
import { Prescription } from '../model/prescription';
import { Appointment } from '../model/appointment';
import { Product } from '../model/product';
import { Orders } from '../model/orders';
import { TestDetails } from '../model/test-details';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {

  }
  public findAll(token: any): Observable<User[]> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<User[]>(AppConstants.USERS, httpOptions1);
  }

  public save(user: User) {
    return this.httpClient.post<User>(AppConstants.API_BASE_URL + AppConstants.USERS, user, httpOptions);
  }

  public changePassword(useInfo: UserInfo): Observable<MessageResponse> {

    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + useInfo.token })
    };
    return this.httpClient.post<any>(AppConstants.CHANGE_PASSWORD, useInfo, httpOptions1);
  }

  getUser(useInfo: UserInfo): Observable<User> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + useInfo.token })
    };
    return this.httpClient.get<User>(AppConstants.GET_USER_BY_ID + useInfo.id, httpOptions1);
  }
  getDoctorById(id: any): Observable<User> {
    return this.httpClient.get<User>(AppConstants.GET_DOCTOR_BY_ID + id, httpOptions);
  }
  getPatientDataById(id: any, token: string) {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<User>(AppConstants.GET_PATIENT_BY_ID + id, httpOptions1);
  }
  uploadFile(user: User): Observable<MessageResponse> {
    //console.log('user.token :: ' + user.token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + user.token })
    };
    var formData = new FormData();
    formData.append("file", user.profileImage);
    return this.httpClient.post<any>(AppConstants.UPLOAD_FILE, formData);
  }
  updateProfile(user: User): Observable<MessageResponse> {
    //console.log('user.token :: ' + user.token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + user.token })
    };
    return this.httpClient.post<any>(AppConstants.UPDATE_PROFILE, user, httpOptions1);
  }
  public saveDependent(dependent: Dependent, token: String): Observable<ApiResponse> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_DEPENDENT, dependent, httpOptions1);
  }
  getDependentList(id: number, token: String): Observable<Dependent[]> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Dependent[]>(AppConstants.GET_DEPENDENTS_LIST + id, httpOptions1);
  }
  public saveMedicalDetails(medicalDetails: MedicalDetails, token: String): Observable<ApiResponse> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_MEDICAL_DETAILS, medicalDetails, httpOptions1);
  }
  getMedicalDetailsList(id: number, token: String): Observable<MedicalDetails[]> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<MedicalDetails[]>(AppConstants.GET_MEDICAL_DETAILS_LIST + id, httpOptions1);
  }
  deleteMedicalDetails(id: number, token: String): Observable<ApiResponse> {
    //console.log("MedicalRecord id::" + id);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.delete<ApiResponse>(AppConstants.DELETE_MEDICAL_DETAILS + id, httpOptions1);
  }
  public saveMedicalRecords(medicalRecords: MedicalRecords, token: String): Observable<ApiResponse> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_MEDICAL_RECORDS, medicalRecords, httpOptions1);
  }
  getMedicalRecordsList(id: number, token: String): Observable<MedicalRecords[]> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<MedicalRecords[]>(AppConstants.GET_MEDICAL_RECORDS_LIST + id, httpOptions1);
  }
  deleteMedicalRecords(id: number, token: String): Observable<ApiResponse> {
    //console.log("MedicalRecord id::" + id);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.delete<ApiResponse>(AppConstants.DELETE_MEDICAL_RECORDS + id, httpOptions1);
  }
  public saveAmbulance(ambulance: Ambulance, token: String): Observable<ApiResponse> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_AMBULANCE, ambulance, httpOptions1);
  }
  getAmbulanceList(id: number, token: String): Observable<Ambulance[]> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Ambulance[]>(AppConstants.GET_AMBULANCE_LIST + id, httpOptions1);
  }
  public savePrescription(prescription: Prescription, token: String): Observable<ApiResponse> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_PRESCRIPTION, prescription, httpOptions1);
  }
  getPrescriptionList(id: number, token: String): Observable<Prescription[]> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Prescription[]>(AppConstants.GET_PRESCRIPTION_LIST + id, httpOptions1);
  }
  public saveAppointment(appointment: Appointment, token: String): Observable<ApiResponse> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_APPOINTMENT, appointment, httpOptions1);
  }
  getPatientAppointmentList(id: any, token: string): Observable<Appointment[]> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Appointment[]>(AppConstants.GET_PATIENT_APPOINTMENT_LIST + id, httpOptions1);
  }

  getDoctorAppointmentList(id: any, token: string): Observable<Appointment[]> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Appointment[]>(AppConstants.GET_DOCTOR_APPOINTMENT_LIST + id, httpOptions1);
  }

  public saveProduct(product: Product, token: String): Observable<ApiResponse> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_PRODUCT, Product, httpOptions1);
  }
  getProductList(userInfo: UserInfo): Observable<Product[]> {
    //console.log('token :: ' + token);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + userInfo.token })
    };
    return this.httpClient.get<Product[]>(AppConstants.GET_PRODUCT_LIST + userInfo.id, httpOptions1);
  }

  public getPatientList(token: string): Observable<User[]> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<User[]>(AppConstants.GET_PATIENT_LIST, httpOptions1);
  }

  public getDoctorsList(): Observable<User[]> {
    return this.httpClient.get<User[]>(AppConstants.GET_DOCTOR_LIST, httpOptions);
  }

  public getDoctorsListConditional(todayFlag: boolean): Observable<User[]> {
    return this.httpClient.get<User[]>(AppConstants.GET_DOCTOR_LIST, httpOptions);
  }

  public getOrdersList(userInfo: UserInfo): Observable<Orders[]> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + userInfo.token })
    };
    return this.httpClient.get<Orders[]>(AppConstants.GET_ORDERS_LIST + userInfo.id, httpOptions1);
  }
  getTestDetails(id: number): Observable<TestDetails> {
    return this.httpClient.get<TestDetails>(AppConstants.GET_TEST_DETAILS + id, httpOptions);
  }
}

