import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../model/medicine';
import { AppConstants } from '../constant/app-constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageResponse } from '../model/message-response';
import { ApiResponse } from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient: HttpClient) { }

  // public save(medicine: Medicine, token: string) {
  //   const httpOptions1 = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
  //   };
  //   return this.httpClient.post<Medicine>(AppConstants.ADD_MEDICINE, medicine, httpOptions1);
  // }

  public save(medicine: Medicine, token: string): Observable<MessageResponse> {
    const formData: FormData = new FormData();
    formData.append('file', medicine.medicineImage);
    formData.append('medicine', new Blob([JSON.stringify(medicine)], {
      type: 'application/json'
    }));
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_MEDICINE, formData, httpOptions1);
  }
  public findAll(token: string): Observable<Medicine[]> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Medicine[]>(AppConstants.ADD_MEDICINE, httpOptions1);
  }
  public findById(id: any): Observable<Medicine> {
    console.log("service id::" + id);
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.httpClient.get<Medicine>(AppConstants.API_BASE_URL + AppConstants.GET_MEDICINE_BY_ID, { params: queryParams });
  }

  deleteMedicine(id: number): Observable<any> {
    console.log("medicine id::" + id);
    return this.httpClient.delete(AppConstants.API_BASE_URL + AppConstants.DELETE_MEDICINE_BY_ID + id, { responseType: 'text' });
  }
}
