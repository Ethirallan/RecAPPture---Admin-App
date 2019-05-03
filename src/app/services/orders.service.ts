import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = 'http://88.200.63.178:3001';

  httpOptions = {headers: new HttpHeaders({ 'auth_token': JSON.parse(sessionStorage.getItem('token')) })};

  constructor(private http: HttpClient) { }

  getOrders(status: string) {
    return this.http.get(this.apiUrl + '/order/complete?status=' + status, this.httpOptions);
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
}
