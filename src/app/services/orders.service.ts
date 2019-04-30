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

  getOrders() {
    return this.http.get(this.apiUrl + '/order/complete', this.httpOptions);
  }

  getOrderByID(id: number) {
    return this.http.get(this.apiUrl + '/order?id=' + id, this.httpOptions);
  }

  setOrder(order: Order) {
    sessionStorage.setItem('order', JSON.stringify(order));
  }

  getOrder(): Order {
    return JSON.parse(sessionStorage.getItem('order'));
  }

  getWoodType(int: number): string {
    if (int == 1) {
      return 'Listavec';
    } else {
      return 'Iglavec';
    }
  }
}
