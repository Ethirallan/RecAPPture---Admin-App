import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = 'http://88.200.63.178:3001';

  constructor(private http: HttpClient) { }

  getOrders(status: string) {
    if (!(status + 'page' in sessionStorage)) {
      console.log('no page');
      this.setPage(1, status);
    }
    console.log(JSON.parse(sessionStorage.getItem(status + 'page')));
    return this.http.get(this.apiUrl + '/order/complete?status=' + status + '&limit=4&page=' + JSON.parse(sessionStorage.getItem(status + 'page')), { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token'))})});
  }

  getOrderByID(id: number) {
    return this.http.get(this.apiUrl + '/order/complete?id=' + id, {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token')), responseType: 'text', observe: 'response' })});
  }

  processOrder(id: number, status: string, subject: string, body: string) {
    let data = JSON.stringify({
      'status': status,
      'subject': subject,
      'body': body
    });
    return this.http.patch(this.apiUrl + '/order/process/' + id, data, {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token')), responseType: 'text', observe: 'response' })});
  }

  getOrdersByEmail(email: string) {
    return this.http.get(this.apiUrl + '/order/user?mail=' + email, {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token')), responseType: 'text', observe: 'response' })});
  }

  setPage(page: number, status: string) {
    sessionStorage.setItem(status + 'page', JSON.stringify(page));
  }

  getWoodType(int: number): string {
    if (int == 1) {
      return 'Listavec';
    } else {
      return 'Iglavec';
    }
  }
}
