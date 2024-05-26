import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../model/medicine';
import { AppConstants } from '../constant/app-constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageResponse } from '../model/message-response';
import { ApiResponse } from '../model/api-response';
import { CartItems } from '../model/cart-items';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient: HttpClient) { }

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
  public findMedicineById(id: any, token: string): Observable<Medicine> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Medicine>(AppConstants.GET_MEDICINE_BY_ID + id, httpOptions1);
  }

  deleteMedicine(id: number, token: string): Observable<any> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.delete(AppConstants.DELETE_MEDICINE_BY_ID + id, httpOptions1);
  }
  saveCartItems(cartItemsList: CartItems[], token: string): Observable<ApiResponse> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.SAVE_CART_ITEMS, cartItemsList, httpOptions1);
  }
  getCartItemsData(id: any, token: string): Observable<CartItems[]> {
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<CartItems[]>(AppConstants.GET_CART_ITEMS_LIST + id, httpOptions1);
  }
}
