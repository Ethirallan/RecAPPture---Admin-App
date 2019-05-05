import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  loading: boolean = true;
  page: number
  status: string;

  constructor(private orderService: OrdersService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.status = this.route.snapshot.data['status'];
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(this.status).subscribe((res: Order[]) => {
      if (res.length == 0) {
        if (this.getCurrentPage() != 1) {
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
    this.orderService.setPage(JSON.parse(sessionStorage.getItem(this.status + 'page')) + 1, this.status);
    this.getOrders();
  }

  prevPage() {
    if (this.getCurrentPage() > 1) {
      this.orderService.setPage(JSON.parse(sessionStorage.getItem(this.status + 'page')) - 1, this.status);
      this.getOrders();
    }
  }

  getPage(page: number) {
    this.orderService.setPage(page, this.status);
    this.getOrders();
  }

  showEmptyText() {
    if (this.status == 'new') {
      return 'Ni novih naročil';
    } else if (this.status == 'waiting') {
      return 'Ni čakajočih naročil';
    } else if (this.status == 'done') {
      return 'Ni končanih naročil';
    } else {
      return 'Ni zavrnjenih naročil';
    }
  }

  getCurrentPage() {
    return JSON.parse(sessionStorage.getItem(this.status + 'page'));
  }

  getPages(): number[] {
    console.log(status);
    if (!(this.status + 'page' in sessionStorage)) {
      this.orderService.setPage(1, status); 
    }
    var page = JSON.parse(sessionStorage.getItem(this.status + 'page'));
    if (page < 3) {
      return [1, 2, 3];
    } else {
      return [page - 1, page, page + 1];
    }
  }
}
