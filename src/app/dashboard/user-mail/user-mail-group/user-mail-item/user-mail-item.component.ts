import { Component, OnInit, Input } from '@angular/core';
import { IMessageData, MessageService } from '../../../../services/message.service';
import { TopEventsService } from '../../../../topevents.service';

@Component({
  selector: 'app-user-mail-item',
  templateUrl: './user-mail-item.component.html',
  styleUrls: ['./user-mail-item.component.css']
})
export class UserMailItemComponent implements OnInit {
  @Input() public message: IMessageData;
  @Input() public useIconInBtns: boolean = true;

  public _iconUnreadedBtn = '<i class="fas fa-eye-slash"></i>';
  public _iconReadedBtn = '<i class="fas fa-eye"></i>';
  public _iconDeleteBtn = '<i class="fas fa-trash"></i>';

  constructor(
    private messageService: MessageService,
    private tes: TopEventsService,
  ) { }

  ngOnInit() {
    console.log('MESSAGES:', this.message);
  }


  public checkMessageAsReaded( id: string ){
    console.log('devss check as readed', id);

    this.messageService.markData( id, 'readed', '1').subscribe(result =>
      {
        console.log('mark to readed result', result);
        this.tes.refreshSegment( 'usermail' );
        this.tes.refreshSegment( 'message' );
      });

  }

  public checkMessageAsUnReaded( id: string ){
    console.log('devss check as readed', id);

    this.messageService.markData( id, 'readed', false).subscribe(result =>
      {
        console.log('mark to unreaded result', result);
        this.tes.refreshSegment( 'usermail' );
        this.tes.refreshSegment( 'message' );
      });

  }
}
