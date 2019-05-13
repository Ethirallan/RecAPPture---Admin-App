import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = 'http://88.200.63.178:3001';

  constructor(private http: HttpClient) { }

  /**
   * getOrders() is called with different statuses (new, waiting, rejected and done) from OrderComponent.
   * First we check if page for that status is already in sessionStorage otherwise we set it's value to 1.
   * Then we return http request for orders with given status, limit - number of orders per page, page number and headers (including token).
   */
  getOrders(status: string) {
    if (!(status + 'page' in sessionStorage)) {
      this.setPage(1, status);
    }
    return this.http.get(this.apiUrl + '/order/complete?status=' + status + '&limit=12&page=' + JSON.parse(sessionStorage.getItem(status + 'page')), { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token'))})});
  }

  // Returns http request for getting order by given id
  getOrderByID(id: number) {
    return this.http.get(this.apiUrl + '/order/complete?id=' + id, {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token')), responseType: 'text', observe: 'response' })});
  }

  /**
   * It makes JSON body, containing new order status and parts of an email which will be sent to the user.
   * Then it retrun the http patch request.
   */
  processOrder(id: number, status: string, subject: string, body: string) {
    let data = JSON.stringify({
      'status': status,
      'subject': subject,
      'body': body
    });
    return this.http.patch(this.apiUrl + '/order/process/' + id, data, {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token')), responseType: 'text', observe: 'response' })});
  }

  // Returnes http request for getting orders made by given email - user
  getOrdersByEmail(email: string) {
    return this.http.get(this.apiUrl + '/order/user?mail=' + email, {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth_token': JSON.parse(sessionStorage.getItem('token')), responseType: 'text', observe: 'response' })});
  }

  // Sets the page for given status with given page value in sessionStorage
  setPage(page: number, status: string) {
    sessionStorage.setItem(status + 'page', JSON.stringify(page));
  }

  // Converts wood_type value (number) into a string and return it
  getWoodType(int: number): string {
    if (int == 1) {
      return 'Listavec';
    } else {
      return 'Iglavec';
    }
  }
}
