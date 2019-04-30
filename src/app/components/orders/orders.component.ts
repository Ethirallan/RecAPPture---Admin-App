import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrdersService, private router: Router) { }

  ngOnInit() {
    this.getOrders();
  }

  openDetails(order: Order) {
    this.orderService.setOrder(order);
    this.router.navigate(['/order/', order.id]);
  }

  getOrders() {
    this.orderService.getOrders().subscribe(res => {
      console.log(res);
      this.orders = res['data'];
    });
  }
}
