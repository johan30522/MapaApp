import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from "mapbox-gl";


interface MarcadrPersonalizado {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `   
  .mapa-container{
    width: 100%;
     height: 100%;
   }
   .list-group {
     position:fixed;
     top:90px;
     right:20px;
     z-index:99;
   }
   li{
     cursor:pointer
   }
   
   
   `


  ]
})
export class MarcadoresComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  public mapa!: mapboxgl.Map;
  public zoomLevel: number = 15;
  public coordenadas: [number, number] = [-84.10058843608712, 9.935849633265324];
  //Arreglo de marcadores
  public marcadores: MarcadrPersonalizado[] = [];



  constructor() { }

  ngOnDestroy(): void {
    //se destruyen todos los listeners
    this.marcadores.forEach(element => {
      element.marker?.off('dragend');
    });
  }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      //se asigna la referencia del elelmento en el formulario el div #mapa
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.coordenadas,
      zoom: this.zoomLevel
    });
    // se cargan los marcadores el localsorage
    this.leerMarcadores_LocalStorage();
    //se crea un marcador
    //se peude agregar un html al marcador en caso que se quiera algo personalizado como el nombre de un establecimiento
    // const markerHtml:HTMLElement=document.createElement('div');
    //markerHtml.innerHTML='hola mundo';
    /*
      const marker=new mapboxgl.Marker(
        {}
      )
        .setLngLat(this.coordenadas)
        .addTo(this.mapa)*/
  }
  public agregarMarcador() {
    // permite generar un color exadecimal aleatorio
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const { lng, lat } = this.mapa.getCenter();
    const nuevoMarcador = new mapboxgl.Marker(
      {
        draggable: true,
        color
      }
    )
      .setLngLat([lng, lat])
      .addTo(this.mapa);
    this.marcadores.push(
      {
        color,
        marker: nuevoMarcador
      }
    );
    this.guardarMarcadores_LocalStorage();

    // se crea un listener para escuchar los cambios en la pocision del marcador
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadores_LocalStorage();
    })

  }

  public borrarMarcador(indice: number) {
    //se elimina el marcador
    this.marcadores[indice]?.marker?.remove();
    //se elimina el item del arreglo
    this.marcadores.splice(indice, 1);
    //se guarda el cambio
    this.guardarMarcadores_LocalStorage();
    console.log('ejecuta dobleclick ');
  }

  public irMarcador(marker: mapboxgl.Marker) {
    const { lng, lat } = marker.getLngLat();
    this.mapa.flyTo(
      { center: [lng, lat] }
    )
  }

  public guardarMarcadores_LocalStorage() {
    let lngLatArr: MarcadrPersonalizado[] = [];
    this.marcadores.forEach(element => {
      const { lng, lat } = element.marker!.getLngLat();
      const color = element.color;
      lngLatArr.push(
        {
          color,
          centro: [lng, lat]
        }
      );
      localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
    });
  }
  public leerMarcadores_LocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    } else {
      //saca el arreglo del localstorage
      const lngLatArr: MarcadrPersonalizado[] = JSON.parse(localStorage.getItem('marcadores')!);
      //por cada elemento lo vuelve a crear en el arreglo de marcadores
      lngLatArr.forEach(element => {
        const nuevoMarcador = new mapboxgl.Marker(
          {
            draggable: true,
            color: element.color
          }
        )
          .setLngLat([Number(element.centro![0]), Number(element.centro![1])])
          .addTo(this.mapa);


        this.marcadores.push(
          {
            color: element.color,
            marker: nuevoMarcador
          }
        );
        // se crea un listener para escuchar los cambios en la pocision del marcador
        nuevoMarcador.on('dragend', () => {
          this.guardarMarcadores_LocalStorage();
        })


      });
    }
  }

}
