import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMessageData, MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-user-message-item',
  templateUrl: './user-message-item.component.html',
  styleUrls: ['./user-message-item.component.css']
})
export class UserMessageItemComponent implements OnInit {

  @Output() readThisMessage = new EventEmitter<boolean>();

  @Input() public item: IMessageData =  {
    subject: "Заголовок не задан",
    text_field: '-',
    datetime: '--,--,--',
    id: '#unknown'
  };
  constructor() { }

  ngOnInit() {
  }

  public i_read_it(): void {
    if( true || confirm('Вы уверены что прочитали?')) this.readThisMessage.emit(true);
  }

}
