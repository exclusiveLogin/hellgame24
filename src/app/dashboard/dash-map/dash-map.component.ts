import {Component, OnInit} from '@angular/core';
import {icon, latLng, Layer, MapOptions, marker, tileLayer} from 'leaflet';
import {UnitsService} from '../../services/units.service';

@Component({
    selector: 'app-dash-map',
    templateUrl: './dash-map.component.html',
    styleUrls: ['./dash-map.component.css']
})
export class DashMapComponent implements OnInit {
    LLlayers: Layer[] = [];

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
    constructor(
        private unitsService: UnitsService,
    ) {

    }

    allUnits$ = this.unitsService.getAllUnits();

    ngOnInit() {
        this.allUnits$.subscribe(units => {
            units.forEach(unit => this.LLlayers.push(marker( [unit.lat, unit.lon ], {
                icon: icon({
                    iconUrl: 'assets/icons/unit_map1.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                })
            })));
        });


    }

}
