import { Component, OnInit } from "@angular/core";
import { OrdersService } from "src/app/services/orders.service";
import { Order, OrderImage } from "src/app/models/order";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"]
})
export class OrderDetailsComponent implements OnInit {
  order: Order;
  myImage: OrderImage;
  sub: any;
  loaded: boolean = false;
  notFound: boolean = false;
  hasCoordinates: boolean;
  mySubject: string = 'Sprejem naročila';
  myMessage: string = 'Spoštovani!\n\n\n\nLep pozdrav, \nMSORA';
  rejectMessage: string = 'Spoštovani!\n\nŽal smo se odločili, da zavrnemo vaše naročilo.\n\nLep pozdrav, \nMSORA';

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getOrderByID(params["id"]);
    });
  }

  getOrderByID(id: number) {
    this.orderService.getOrderByID(id).subscribe(res => {
      console.log(res);
      if (res[0] === undefined) {
        this.notFound = true;
      } else {
        this.order = res[0];
        this.loaded = true;
        this.notFound = false;
      }
    }, error => console.log(error));
  }

  acceptOrder() {
    this.orderService.processOrder(this.order.id, 'waiting', this.mySubject, this.myMessage).subscribe(res => {
      console.log(res);
    }, error => console.log(error));
  }

  rejectOrder() {
    this.orderService.processOrder(this.order.id, 'rejected', 'Zavrnitev naročila', this.rejectMessage).subscribe(res => {
      console.log(res);
    }, error => console.log(error));
  }

  getStatus(status: string) {
    if (status == 'new') {
      return 'Novo';
    } else if (status == 'done') {
      return 'Zaključeno';
    } else if (status == 'rejected') {
      return 'Zavrnjeno';
    } else {
      return 'Čaka';
    }
  }
}
