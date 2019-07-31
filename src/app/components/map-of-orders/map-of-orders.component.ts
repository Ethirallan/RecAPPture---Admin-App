import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private orderService: OrdersService, private toastr: ToastrService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.mapOfOrders = L.map("mapOfOrders", {
      center: [46.151230, 14.996493],
      zoom: 9,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.mapOfOrders);

    this.orderService.getRoute().subscribe(res => {
      res['data'].forEach(point => {
        let marker = new L.Marker([point.lat, point.lng], {
          icon: L.icon({
             iconSize: [ 50, 70 ],
             iconAnchor: [ 13, 51 ],
             iconUrl: 'assets/REmarker.png',
             popupAnchor: [13, -51]
          })
        });
        marker.bindPopup('<p style="font-size: 16px;"><b style="font-size: 18px;">Naročilo ' +  point.id + '<br>Lokacija:</b> ' +  point.address + '<br><b>Vrsta lesa:</b> ' + this.orderService.getWoodType(point.wood_type) + '<br><b>Količina:</b> ' + point.kub + ' &#x33a5;</p>' + 
        '<button class="btn btn-block"style="background-color: #bad12f; color: white;" type="submit"><a style="color: white; text-decoration: none;" href="/narocilo/' + point.id + '">Podrobnosti</a></button>');

        marker.addTo(this.mapOfOrders);
      });
    }, error => {
      this.toastr.error('Težave pri povezovanju s strežnikom. Prosimo, poskusite kasneje.', 'Opala ...');
    });
  }
}
