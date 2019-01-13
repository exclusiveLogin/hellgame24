import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessory-container',
  templateUrl: './accessory-container.component.html',
  styleUrls: ['./accessory-container.component.css']
})
export class AccessoryContainerComponent implements OnInit {

  public toggle = 'inventory';

  constructor() { }

  ngOnInit() {

  }

  toggleHeader(event){
    if( event ) this.toggle = event;
  }

}
