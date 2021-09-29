import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from "mapbox-gl";


@Component({
  selector: 'app-zoom-ranmge',
  templateUrl: './zoom-ranmge.component.html',
  styles: [
    `
    .mapa-container{
     width: 100%;
      height: 100%;
    }
    .row{
      background-color:white;
      border-radius:5px;
      bottom:50px;
      position:fixed;
      left:50px;
      padding:10px;
      z-index:999;
      width:400px;
    }
  `
  ]
})
export class ZoomRanmgeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  public mapa!: mapboxgl.Map;
  public zoomLevel: number = 10;
  public coordenadas: [number, number] = [-84.10058843608712, 9.935849633265324];


  constructor() {
  }
  ngOnDestroy(): void {
    //se deben destruir todos los listeners creados
    this.mapa.off('zoom', () => { });
    this.mapa.off('zoomend', () => { });
    this.mapa.off('move', () => { });
  }

  ngAfterViewInit(): void {

    console.log(this.divMapa);
    //Se inicializa el mapa
    this.mapa = new mapboxgl.Map({
      //se asigna la referencia del elelmento en el formulario el div #mapa
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.coordenadas,
      zoom: this.zoomLevel
    });
    // asigna el nivel de zoom actual a la propiedad en caso de nio usar los botones

    //listener escuacha cuando se hace zoom
    this.mapa.on('zoom',
      (eve) => {

        this.zoomLevel = this.mapa.getZoom();
      }
    )
    //Listener que restringe el zoom a 18
    this.mapa.on('zoomend',
      (eve) => {

        if (this.mapa.getZoom() > 18) {
          this.mapa.zoomTo(18)
        }

      }
    )
    //listener que escucah el movimiento de el mapa
    this.mapa.on('move',
      (eve) => {
        const target = eve.target;
        const { lng, lat } = target.getCenter();
        //actualiza las coordenadas
        this.coordenadas = [lng, lat];
      }
    )



  }


  public zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();

  }
  public zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }
  public cambioZoom(valor: any): void {
    console.log(valor);
    this.mapa.zoomTo(Number(valor));
  }


}
