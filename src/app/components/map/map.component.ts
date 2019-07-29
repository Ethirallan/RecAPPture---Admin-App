import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';

declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input("lat")
  public lat: number;

  @Input("lng")
  public lng: number;

  private map: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.map = L.map(this.mapElement.nativeElement, {
      center: [this.lat, this.lng],
      zoom: 17,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    let marker = new L.Marker([this.lat, this.lng], {
      icon: L.icon({
        iconSize: [ 50, 70 ],
        iconAnchor: [ 13, 51 ],
        iconUrl: 'assets/REmarker.png',
      })
    });
    marker.addTo(this.map);
  }
}
