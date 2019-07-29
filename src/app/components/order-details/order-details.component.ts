import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { OrdersService } from "src/app/services/orders.service";
import { Order, OrderImage, MyResp } from "src/app/models/order";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"]
})

export class OrderDetailsComponent implements OnInit {

  @ViewChild("map")
  public mapElement: MapComponent;

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
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  // Get the order id from the router and get order details for this order
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getOrderByID(params["id"]);
    });
  }
  

  /**
   * Subscribe to http request for getting the order with given id.
   * If the response is undefined, then it sets notFound to true;
   * else it sets this.order to response value, this.loaded to true and this.notFound to false.
   */
  getOrderByID(id: number) {
    this.orderService.getOrderByID(id).subscribe((res: MyResp) => {
      if (res === undefined) {
        this.notFound = true;
      } else {
        this.order = res.data[0];
        this.loaded = true;
        this.notFound = false;
      }
    }, error => console.log(error));
  }

  // Use http request to accept an order and informs the user with an email
  acceptOrder() {
    this.orderService.processOrder(this.order.id, 'waiting', this.mySubject, this.myMessage).subscribe(res => {
      this.toastr.success('Naročilo je bilo uspešno sprejeto.', 'Sprejem naročila');
      this.backClicked();
    }, error => this.toastr.error('Težave pri sprejemu naročila. Prosimo, poskusite ponovno kasneje.', 'Sprejem naročila'));
  }

  // Use http request to reject an order and informs the user with an email
  rejectOrder() {
    this.orderService.processOrder(this.order.id, 'rejected', 'Zavrnitev naročila', this.rejectMessage).subscribe(res => {
      this.toastr.success('Naročilo je bilo uspešno zavrnjeno.', 'Zavrnitev naročila');
      this.backClicked();
    }, error => this.toastr.error('Težave pri zavrnitvi naročila. Prosimo, poskusite ponovno kasneje.', 'Zavrnitev naročila'));
  }

  // Translates status string into slovene and returns it.
  getStatus(status: string) {
    if (status == 'new') {
      return 'Novo naročilo';
    } else if (status == 'done') {
      return 'Zaključeno naročilo';
    } else if (status == 'rejected') {
      return 'Zavrnjeno naročilo';
    } else {
      return 'Čakajoče naročilo';
    }
  }

  // Go to last page
  backClicked() {
    this.location.back();
  }
}
