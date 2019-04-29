import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;
  sub: any;
  loaded: boolean = false;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.order = this.orderService.getOrder();
  }
}
