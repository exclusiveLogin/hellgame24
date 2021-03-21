import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMessageData, MessageService } from '../../../services/message.service';
import { TopEventsService } from '../../../services/topevents.service';
import { IUser } from '../../../models/user-interface';
import { Observable } from 'rxjs/Observable';
import { UserServiceService } from '../../../services/user-service.service';
import { UiService } from '../../../services/ui.service';
import { enterLeaveAnimationDefault } from '../../../models/enterLeaveAnimation';


export interface IGroupMessages {
  author: string;
  messages: IMessageData[];
  user: Observable<IUser>;
}

@Component({
  selector: 'app-user-mail',
  templateUrl: './user-mail.component.html',
  styleUrls: ['./user-mail.component.css'],
  animations: [enterLeaveAnimationDefault]
})
export class UserMailComponent implements OnInit {

  @Input() public title: string;
  @Input() public user: string;
  @Input() public useGroup = true;

  @HostBinding('@Anima') public myStatusAnima = true;

  private _messageSubscription: Subscription;
  public _messageItems: IMessageData[] = [];
  public _groupedItems: IGroupMessages[] = [];

  constructor(
    private tes: TopEventsService,
    private messageService: MessageService,
    private userService: UserServiceService,
    private ui: UiService,
  ) { }

  ngOnInit() {
    if ( this.user ) {

      this._messageSubscription = this.tes.getSegmentRefreshSignal( 'usermail' )
      .subscribe( refreshFlag => {
        if ( !!refreshFlag ) { Promise.resolve().then(() => this.refreshMessages()); }
      });

      this.refreshMessages();
    }
  }


  private refreshMessages(): void {
    console.log('devss USERMAIL RefreshMessages fire');
    this.messageService.getData(
      this.user ?
       {to_user: this.user} :
        null
        ).subscribe(items => {
      console.log('devss USERMAIL RefreshMessages get', items);
      this._messageItems = items;

      if ( this.useGroup ) { this.groupMessages( items ); }
    });
  }

  private groupMessages( messages: IMessageData[] ): void {
    if ( messages ) {
      const group: IGroupMessages[] = [];

      messages.forEach((message: IMessageData) => {
        const eg: IGroupMessages = group.find( existGroup => existGroup.author === message.author);

        if ( eg ) { eg.messages ? eg.messages.push( message ) : eg.messages = []; } else { group.push({
          author: message.author,
          messages: [message],
          user: this.userService.getUser( message.author )
        });
        }
      });

      this._groupedItems = group;
    }
  }

  public closeMail() {
    this.ui.closeUsermail();
  }

}
