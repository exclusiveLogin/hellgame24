import {Component, OnInit} from '@angular/core';
import {latLng, tileLayer} from "leaflet";

@Component({
    selector: 'app-dash-map',
    templateUrl: './dash-map.component.html',
    styleUrls: ['./dash-map.component.css']
})
export class DashMapComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    options = {
        layers: [
            tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {maxZoom: 18, attribution: '...'})
        ],
        zoom: 10,
        center: latLng(53.160976, 48.458633)
    };

}
