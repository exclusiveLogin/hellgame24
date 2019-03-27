import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { IUserStatus } from '../../../dashboard/user-module/user-status/user-status.component';

const ua = require('ua-parser-js');

@Component({
  selector: 'app-user-status-item-log',
  templateUrl: './user-status-item.component.html',
  styleUrls: ['./user-status-item.component.css']
})
export class UserStatusItemComponent implements OnInit {

  @Output() removeMessageEvent = new EventEmitter<boolean>();

  @Input() ownerMode: boolean = false;

  @Input() public useIconInBtns: boolean = true;

  @Input() public item: IUserStatus =  {
    id: '',
    login: 'unknown',
    status: '',
  };

  public _iconDeleteBtn = '<i class="fas fa-trash"></i>';
  
  constructor(
  ) { }

  ngOnInit() {
  
  }

  public removeThisMessage(){
    if( confirm('Точно удалить?')) this.removeMessageEvent.emit(true);
  };
}
