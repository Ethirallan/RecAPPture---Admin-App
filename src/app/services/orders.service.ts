import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = 'http://88.200.63.178:3000';
  order: Order;

  httpOptions = {headers: new HttpHeaders({ 'auth_token': JSON.parse(sessionStorage.getItem('token')) })};

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.apiUrl + '/order', this.httpOptions);
  }

  setOrder(order: Order) {
    this.order = order;
  }

  getOrder(): Order {
    return this.order;
  } 
}
