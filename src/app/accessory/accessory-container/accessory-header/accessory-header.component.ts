import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accessory-header',
  templateUrl: './accessory-header.component.html',
  styleUrls: ['./accessory-header.component.css']
})
export class AccessoryHeaderComponent implements OnInit {

  @Input() state: string = 'inventory';
  @Output() toggle: EventEmitter<string> =  new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  public toggleAccessory(newState: string){
    this.state = newState;
    this.toggle.emit(this.state);
  }

}
