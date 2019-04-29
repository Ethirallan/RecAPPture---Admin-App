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
    var link = '/order/' + order.id;
    this.router.navigate([link]);
  }

  getOrders() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res['message']['data'];
    });
  }

  getWoodType(int: number): string {
    if (int == 1) {
      return 'Listavec';
    } else {
      return 'Iglavec';
    }
  }

}
