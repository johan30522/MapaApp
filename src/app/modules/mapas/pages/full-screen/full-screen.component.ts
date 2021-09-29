import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa{
     width: 100%;
      height: 100%;
    }
  `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'mapa', // aca va la referencia o el id del elemento div del html
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[-84.10058843608712,9.935849633265324],
      zoom:16,
      interactive:false
    });
  }

}
