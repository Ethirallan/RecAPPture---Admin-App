import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;
  sub: any;
  loaded: boolean = false;

  constructor(private orderService: OrdersService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.order = this.orderService.getOrder();
    this.sub = this.route.params.subscribe(params => {
      console.log(params['id']);
      this.getOrderByID(params['id']);
      this.loaded = true;
    });
  }

  getOrderByID(id: number) {
    this.orderService.getOrderByID(id).subscribe(res => {
      console.log(res);
      this.order = res[0];
    });
  }
}
