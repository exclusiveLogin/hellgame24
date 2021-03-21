import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService, IMessageData } from '../../../services/message.service';
import { TopEventsService } from '../../../services/topevents.service';
import { Subscription } from 'rxjs';
import { IParams } from '../../../services/connector.service';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {

  public _messageItems: IMessageData[] = [];
  private _messageSubscripton: Subscription;

  @Input() public messageHeight = 400;

  @Input() public author: string;

  @Input() public to_user: string;

  @Input() public isUnreadedOnly = false;

  @Input() public title = 'Непрочитанные сообщения';
  constructor(
    private messageService: MessageService,
    private tes: TopEventsService,
  ) { }

  ngOnInit() {
    this._messageSubscripton = this.tes.getSegmentRefreshSignal( 'message' )
      .subscribe( refreshFlag => {
        console.log('devss message REFRESH FLAG', refreshFlag);
        if ( refreshFlag ) { Promise.resolve().then(() => this.refreshMessages()); }
      });
    this.refreshMessages();
  }

  private refreshMessages(): void {
    const params: IParams = (this.to_user) ?
    {to_user: this.to_user, readed: this.isUnreadedOnly} :
     null;
    this.messageService.getData( params ).subscribe(items => {
      console.log('devss messageService RefreshMessages get', items);
      this._messageItems = items;
    });
  }

  public checkMessageAsReaded( id: string ) {
    console.log('devss check as readed', id);

    this.messageService.markData( id, 'readed', '1').subscribe(result => {
        console.log('mark to readed result', result);
        this.tes.refreshSegment( 'message' );
        this.tes.refreshSegment( 'usermail' );
      });

  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if (this._messageSubscripton) { this._messageSubscripton.unsubscribe(); }
  }
}
