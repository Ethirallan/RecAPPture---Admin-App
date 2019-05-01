import { Component, OnInit } from "@angular/core";
import { OrdersService } from "src/app/services/orders.service";
import { Order } from "src/app/models/order";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"]
})
export class OrderDetailsComponent implements OnInit {
  order: Order;
  sub: any;
  loaded: boolean = false;
  notFound: boolean = false;
  hasCoordinates: boolean;
  myMessage: string = 'Spoštovani!\n\n\n\nLep pozdrav, \nMSORA';

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
      if (res[0] === undefined) {
        this.notFound = true;
      } else {
        this.order = res[0];
        this.loaded = true;
        this.notFound = false;
      }
    });
  }

  sendMsg() {
    console.log(this.myMessage);
  }
}
