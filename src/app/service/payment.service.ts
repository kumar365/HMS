import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constant/app-constants';
import { ApiResponse } from '../model/api-response';
import { Bill } from '../model/bill';
import { Invoice } from '../model/invoice';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private httpClient: HttpClient) { }
  public saveInvoice(invoice: Invoice, token: String): Observable<ApiResponse> {
    console.log('token :: ' + token);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_INVOICE, invoice, httpOptions);
  }
  getInvoiceList(id: number, token: String): Observable<Invoice[]> {
    console.log('token :: ' + token);
    // alert(id);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Invoice[]>(AppConstants.GET_INVOICE_LIST + id, httpOptions);
  }
  public saveBill(bill: Bill, token: String): Observable<ApiResponse> {
    console.log('token :: ' + token);

    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.post<ApiResponse>(AppConstants.ADD_BILL, bill, httpOptions1);
  }
  getBillList(id: number, token: String): Observable<Bill[]> {
    console.log('token :: ' + token);
    // alert(id);
    const httpOptions1 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token })
    };
    return this.httpClient.get<Bill[]>(AppConstants.GET_BILL_LIST + id, httpOptions1);
  }
}
