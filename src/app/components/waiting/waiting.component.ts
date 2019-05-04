import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  orders: Order[];
  loading: boolean = true;
  page: number

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders('waiting').subscribe((res: Order[]) => {
      if (res.length == 0) {
        if (this.orderService.getCurrentPage() != 1) {
          this.prevPage();
        } else {
          this.loading = false;
        }
      } else {
        this.orders = res;
      this.loading = false;
      }
    }, error => console.log(error));
  }

  nextPage() {
    this.orderService.setPage(JSON.parse(sessionStorage.getItem('page')) + 1);
    this.getOrders();
  }

  prevPage() {
    if (this.orderService.getCurrentPage() > 1) {
      this.orderService.setPage(JSON.parse(sessionStorage.getItem('page')) - 1);
      this.getOrders();
    }
  }

  getPage(page: number) {
    this.orderService.setPage(page);
    this.getOrders();
  }
}

