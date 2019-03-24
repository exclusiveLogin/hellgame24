import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IBlogData } from '../../../services/blog.service';

@Component({
  selector: 'app-user-emo-item-log',
  templateUrl: './user-emo-item.component.html',
  styleUrls: ['./user-emo-item.component.css']
})
export class UserEmoItemComponent implements OnInit {

  @Output() removeMessageEvent = new EventEmitter<boolean>();

  @Input() ownerMode: boolean = false;

  @Input() public useIconInBtns: boolean = true;

  @Input() public item: IBlogData =  {
    title: "Заголовок не задан",
    text_field: '-',
    datetime: '--,--,--',
    id: '#unknown'
  };

  public _iconDeleteBtn = '<i class="fas fa-trash"></i>';
  
  constructor() { }

  ngOnInit() {
  }

  public removeThisMessage(){
    if( confirm('Точно удалить?')) this.removeMessageEvent.emit(true);
  };
}
