import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

declare var L: any;

@Component({
  selector: 'app-map-of-orders',
  templateUrl: './map-of-orders.component.html',
  styleUrls: ['./map-of-orders.component.css']
})
export class MapOfOrdersComponent implements OnInit {

  private mapOfOrders: any;
  coordinates: {
    lat: number,
    lng: number
  }[] = [];

  bla: any = [];

  constructor(private orderService: OrdersService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.mapOfOrders = L.map("mapOfOrders", {
      center: [46.151230, 14.996493],
      zoom: 9,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.mapOfOrders);

    this.orderService.getAllOrders().subscribe(res => {
      console.log(res['data'][0]);
      res['data'].forEach(point => {
        let marker = new L.Marker([point.lat, point.lng], {
          icon: L.icon({
             iconSize: [ 50, 70 ],
             iconAnchor: [ 13, 51 ],
             iconUrl: 'assets/REmarker.png',
             popupAnchor: [13, -51]
          })
        });
        marker.bindPopup('<b>Naročilo ' +  point.id + '<br>Lokacija:</b> ' +  point.address + '<br><b>Vrsta lesa:</b> ' + this.orderService.getWoodType(point.wood_type) + '<br><b>Količina:</b> ' + point.kub + ' &#x33a5;');

        marker.addTo(this.mapOfOrders);
      });
    }, error => {
      console.log(error);
    });
  }
}
