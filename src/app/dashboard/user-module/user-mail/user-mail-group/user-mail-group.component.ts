import { Component, OnInit, Input } from '@angular/core';
import { IGroupMessages } from '../user-mail.component';

@Component({
  selector: 'app-user-mail-group',
  templateUrl: './user-mail-group.component.html',
  styleUrls: ['./user-mail-group.component.css']
})
export class UserMailGroupComponent implements OnInit {

  @Input() public group: IGroupMessages;
  @Input() public useGroup = true;

  public _groupShown = false;

  constructor() { }

  ngOnInit() {
    console.log('GROUP INIT:', this.group);
    if ( this.group && this.group.messages ) { this._groupShown = this.group.messages.some(message => !message.readed); }
  }

  public toggleGroupShown(): void {
    this._groupShown = !this._groupShown;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    console.log('GROUP DESTROY:', this.group);
  }
}
