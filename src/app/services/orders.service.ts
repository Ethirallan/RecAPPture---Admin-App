import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = 'http://88.200.63.178:3001';

  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token')), responseType: 'text', observe: 'response' })};

  constructor(private http: HttpClient) { }

  getOrders(status: string) {
    if (!('page' in sessionStorage)) {
      this.setPage(1);
    }
    return this.http.get(this.apiUrl + '/order/complete?status=' + status + '&limit=12&page=' + JSON.parse(sessionStorage.getItem('page')), {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token')), responseType: 'text', observe: 'response' })});
  }

  getOrderByID(id: number) {
    return this.http.get(this.apiUrl + '/order/complete?id=' + id, this.httpOptions);
  }

  getWoodType(int: number): string {
    if (int == 1) {
      return 'Listavec';
    } else {
      return 'Iglavec';
    }
  }

  processOrder(id: number, status: string, subject: string, body: string) {
    let data = JSON.stringify({
      'status': status,
      'subject': subject,
      'body': body
    });
    return this.http.patch(this.apiUrl + '/order/process/' + id, data, this.httpOptions);
  }

  getOrdersByEmail(email: string) {
    return this.http.get(this.apiUrl + '/order/user?mail=' + email, this.httpOptions);
  }

  setPage(page: number) {
    sessionStorage.setItem('page', JSON.stringify(page));
  }

  getCurrentPage() {
    return JSON.parse(sessionStorage.getItem('page'));
  }

  getPages(): number[] {
    if (!('page' in sessionStorage)) {
      this.setPage(1); 
    }
    var page = JSON.parse(sessionStorage.getItem('page'));
    if (page < 3) {
      return [1, 2, 3];
    } else {
      return [page - 1, page, page + 1];
    }
  }
}
