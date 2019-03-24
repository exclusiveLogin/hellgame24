import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITrendItem } from '../../../models/user-interface';

@Component({
  selector: 'app-user-emo-item-log',
  templateUrl: './user-emo-item.component.html',
  styleUrls: ['./user-emo-item.component.css']
})
export class UserEmoItemComponent implements OnInit {

  @Output() removeMessageEvent = new EventEmitter<boolean>();

  @Input() ownerMode: boolean = false;

  @Input() public useIconInBtns: boolean = true;

  @Input() public item: ITrendItem;

  public _iconDeleteBtn = '<i class="fas fa-trash"></i>';
  
  constructor() { }

  ngOnInit() {
  }

  public removeThisMessage(){
    if( confirm('Точно удалить?')) this.removeMessageEvent.emit(true);
  };
}
