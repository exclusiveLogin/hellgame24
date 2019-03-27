import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../../services/user-service.service';
import { IUserStatus } from '../../dashboard/user-module/user-status/user-status.component';

@Component({
  selector: 'app-user-status-log',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit, OnChanges {

  public _items: IUserStatus[] = [];
  private _statusSubscripton: Subscription;
  private statusGetItemsSubscription: Subscription;

  @Input() public height: number = 400;

  @Input() public author: string;

  public ownerMode: boolean = false;

  private skip = 0;
  public nomore = false;

  @Input() public title = 'Лог статусов пользователя';
  constructor(
    private statusService: UserServiceService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.refreshLogins();
  }

  private refreshLogins(): void{
    if( !!this.author )
      this.statusGetItemsSubscription = this.statusService.getUserStatus( this.author ).subscribe(items => {
        this._items = items;
        this.skip = items.length;
      });
  }

  public next(): void{
    if( !!this.author )
      this.statusGetItemsSubscription = this.statusService.getUserStatus(this.author, this.skip).subscribe( items => {
        items.length && this._items.push(...items);
        this.skip += items.length;
        if(!items.length) this.nomore = true;
      });
  }

  public removeBlogItem( id: string ){
    
  }

  ngOnChanges(sc: SimpleChanges){
    if(!!sc['author'].currentValue && sc['author'].currentValue !== sc['author'].previousValue){
      if( this.statusGetItemsSubscription ) this.statusGetItemsSubscription.unsubscribe();
      this.refreshLogins();
    }
    this.ownerMode = (this.auth.authorizedAs() === this.author) ? true : false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if( this._statusSubscripton ) this._statusSubscripton.unsubscribe();
    if( this.statusGetItemsSubscription ) this.statusGetItemsSubscription.unsubscribe();
  }
}
