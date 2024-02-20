import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../model/medicine';
import { AppConstants } from '../constant/app-constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private medicineUrl: string;

  constructor(private httpClient: HttpClient) {
    this.medicineUrl = AppConstants.API_BASE_URL + AppConstants.AddMedicine;

  }

  public save(medicine: Medicine) {
    return this.httpClient.post<Medicine>(this.medicineUrl, medicine);
  }
  public findAll(): Observable<Medicine[]> {
    console.log("findAll method");
    return this.httpClient.get<Medicine[]>(this.medicineUrl);
  }
  public findById(id: any): Observable<Medicine> {
    console.log("service id::" + id);
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.httpClient.get<Medicine>(AppConstants.API_BASE_URL + AppConstants.GetMedicineById, { params: queryParams });
  }
 
  deleteMedicine(id: number): Observable<any> {
    console.log("medicine id::" + id);
    return this.httpClient.delete(AppConstants.API_BASE_URL + AppConstants.DeleteMedicineById + id, { responseType: 'text' });
  }
}
