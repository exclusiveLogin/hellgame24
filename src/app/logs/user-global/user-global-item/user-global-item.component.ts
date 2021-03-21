import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import { IGlobalState } from '../../../models/global-state-interface';

@Component({
  selector: 'app-user-global-item-log',
  templateUrl: './user-global-item.component.html',
  styleUrls: ['./user-global-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGlobalItemComponent implements OnInit {

  public cls = 'grey';

  @Output() removeMessageEvent = new EventEmitter<boolean>();

  @Input() ownerMode = false;

  @Input() public useIconInBtns = true;

  @Input() public item: IGlobalState =  {
    id: '',
    login: 'unknown',
    global_code: 'grey',
    message: ''
  };

  public _iconDeleteBtn = '<i class="fas fa-trash"></i>';

  constructor(

  ) { }

  ngOnInit() {
    this.getGlobalCodeTitle();
  }

  public getGlobalCodeTitle(): string {
    let str: string = null;

    switch ( this.item && this.item.global_code ) {
      case 'red':
        str = 'Красный код';
        this.cls = 'red';
        break;
      case 'orange':
        str = 'Оранжевый код';
        this.cls = 'orange';
        break;
      case 'green':
        str = 'Зеленый код';
        this.cls = 'green';
        break;
      default:
        str = this.item.global_code;
        this.cls = 'grey';
    }

    return str;
  }

  public removeThisMessage() {
    if ( confirm('Точно удалить?')) { this.removeMessageEvent.emit(true); }
  }
}
