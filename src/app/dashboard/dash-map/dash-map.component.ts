import {Component, OnInit} from '@angular/core';
import {latLng, MapOptions, tileLayer} from 'leaflet';

@Component({
    selector: 'app-dash-map',
    templateUrl: './dash-map.component.html',
    styleUrls: ['./dash-map.component.css']
})
export class DashMapComponent implements OnInit {
    options: MapOptions = {
        layers: [
            tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=f72ed756-8e30-42c9-818a-945f09747ce8', {
                maxZoom: 18,
                attribution: '...',
                crossOrigin: true,
            })
        ],
        zoom: 10,
        center: latLng(53.160976, 48.458633)
    };
    constructor() {
    }

    ngOnInit() {
    }



}
