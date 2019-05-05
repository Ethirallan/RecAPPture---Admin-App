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

  // onInit it gets status value from the route and assign it to this.status. Then it call getOrders()
  ngOnInit() {
    this.status = this.route.snapshot.data['status'];
    this.getOrders();
  }

  /**
   * Subscribes to orderService.getOrders with status parameter and gets back an array of Order(s).
   * If response's length is 0, then it checks if the current page is 1 and if not it calls prevPage();
   * else it assigns response to this.orders and sets loading to false.
   */
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

  // Increase page value for orders state in sessionStorage by one and then calls getOrder() to get orders from the next page
  nextPage() {
    this.orderService.setPage(JSON.parse(sessionStorage.getItem(this.status + 'page')) + 1, this.status);
    this.getOrders();
  }

  // Decrease page value for orders state in sessionStorage by one and then calls getOrder() to get orders from the prev page
  prevPage() {
    if (this.getCurrentPage() > 1) {
      this.orderService.setPage(JSON.parse(sessionStorage.getItem(this.status + 'page')) - 1, this.status);
      this.getOrders();
    }
  }

  // Sets page value for orders state to given page value and gets orders from that given page
  getPage(page: number) {
    this.orderService.setPage(page, this.status);
    this.getOrders();
  }

  // If orders array is empty, then we need to display a text, which is different for each possible status valeu. This function return that text
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

  // Returns page for order status from sessionStorage
  getCurrentPage() {
    return JSON.parse(sessionStorage.getItem(this.status + 'page'));
  }

  /**
   * Function for determining pagination buttons.
   * First it checks if there is a page in sessionStorage for orders state, otherwise setting its value to 1.
   * Then it makes a new var - page whick holds the value from sessionStorage.
   * In the end it returns int[] containing page numbers which will be displayed as buttons.
   */
  getPages(): number[] {
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
