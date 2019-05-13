import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchMail: string;

  constructor(public auth: AuthService, public orderService: OrdersService) { }

  ngOnInit() {
  }

  // Get orders posted by user with given email
  findUser() {
    this.orderService.getOrdersByEmail(this.searchMail).subscribe(res => {
      console.log(res);
    }, error => console.log(error));
  }

}
