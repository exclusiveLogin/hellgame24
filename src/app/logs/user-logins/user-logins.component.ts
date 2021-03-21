import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopEventsService } from '../../services/topevents.service';
import { Subscription } from 'rxjs';
import { ITrendItem, ILoginLog } from '../../models/user-interface';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-logins-log',
  templateUrl: './user-logins.component.html',
  styleUrls: ['./user-logins.component.css']
})
export class UserLoginsComponent implements OnInit, OnChanges {

  public _items: ILoginLog[] = [];
  private _loginsSubscripton: Subscription;
  private loginsGetItemsSubscription: Subscription;

  @Input() public height = 400;

  @Input() public author: string;

  public ownerMode = false;

  private skip = 0;
  public nomore = false;

  @Input() public title = 'Входы пользователя';
  constructor(
    private loginsService: UserServiceService,
    private tes: TopEventsService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.refreshLogins();
  }

  private refreshLogins(): void {
    if ( !!this.author ) {
      this.loginsGetItemsSubscription = this.loginsService.getLoginsLog( this.author ).subscribe(items => {
        console.log('devss loginservice get', items);
        this._items = items;
        this.skip = items.length;
      });
    }
  }

  public next(): void {
    if ( !!this.author ) {
      this.loginsGetItemsSubscription = this.loginsService.getLoginsLog(this.author, this.skip).subscribe( items => {
        items.length && this._items.push(...items);
        this.skip += items.length;
        if (!items.length) { this.nomore = true; }
      });
    }
  }

  public removeBlogItem( id: string ) {

  }

  ngOnChanges(sc: SimpleChanges) {
    if (!!sc['author'].currentValue && sc['author'].currentValue !== sc['author'].previousValue) {
      if ( this.loginsGetItemsSubscription ) { this.loginsGetItemsSubscription.unsubscribe(); }
      this.refreshLogins();
    }
    this.ownerMode = (this.auth.authorizedAs() === this.author) ? true : false;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if ( this._loginsSubscripton ) { this._loginsSubscripton.unsubscribe(); }
    if ( this.loginsGetItemsSubscription ) { this.loginsGetItemsSubscription.unsubscribe(); }
  }
}
