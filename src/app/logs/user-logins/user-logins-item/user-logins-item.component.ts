import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ILoginLog } from '../../../models/user-interface';

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
  
  constructor() { }

  ngOnInit() {
  }

  public removeThisMessage(){
    if( confirm('Точно удалить?')) this.removeMessageEvent.emit(true);
  };
}
