import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ILoginLog } from '../../../models/user-interface';
import { DadataService } from '../../../services/dadata.service';

const ua = require('ua-parser-js');

@Component({
  selector: 'app-user-logins-item-log',
  templateUrl: './user-logins-item.component.html',
  styleUrls: ['./user-logins-item.component.css']
})
export class UserLoginsItemComponent implements OnInit {

  @Output() removeMessageEvent = new EventEmitter<boolean>();

  @Input() ownerMode: boolean = false;

  @Input() public useIconInBtns: boolean = true;

  @Input() public item: ILoginLog =  {
    id: '',
    login: 'unknown',
    user_agent: '',
    battery: '---',
    position_lat: '---',
    position_lon: '---',
    accuracy: ''
  };

  public _iconDeleteBtn = '<i class="fas fa-trash"></i>';

  public _address: string = null;

  public getUASystem(u: string){
    let userAgent = ua(u);
    return `${userAgent.os.name ? userAgent.os.name :''} ${userAgent.os.version ? userAgent.os.version :''}`;
  }

  public getUABrowser(u: string){
    let userAgent = ua(u);
    return `${userAgent.browser.name ? userAgent.browser.name :''} ${userAgent.browser.version ? userAgent.browser.version :''}`;
  }

  public getUADevice(u: string){
    let userAgent = ua(u);
    return `${userAgent.device.model ? userAgent.device.model :''} ${userAgent.device.type ? userAgent.device.type :''} ${userAgent.device.vendor ? userAgent.device.vendor :''}`;
  } 

  public getUADeviceType(u: string){
    let userAgent = ua(u);
    return userAgent.device.type ? userAgent.device.type : null;
  } 

  
  constructor(
    private dadata: DadataService
  ) { }

  ngOnInit() {
    if(this.item.position_lat && this.item.position_lon ) this.dadata.getAddressesFromLocation( this.item.position_lat, this.item.position_lon, this.item.accuracy )
      .subscribe( address => this._address = address );
  }

  public removeThisMessage(){
    if( confirm('Точно удалить?')) this.removeMessageEvent.emit(true);
  };
}
