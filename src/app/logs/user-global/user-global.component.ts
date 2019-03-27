import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { IGlobalState } from '../../models/global-state-interface';

@Component({
  selector: 'app-user-global-log',
  templateUrl: './user-global.component.html',
  styleUrls: ['./user-global.component.css']
})
export class UserGlobalComponent implements OnInit, OnChanges {

  public _items: IGlobalState[] = [];
  private _globalSubscripton: Subscription;
  private globalGetItemsSubscription: Subscription;

  @Input() public height: number = 400;

  @Input() public author: string;

  public ownerMode: boolean = false;

  private skip = 0;
  public nomore = false;

  @Input() public title = 'Глобальный статус';
  constructor(
    private global: GlobalService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.refreshGlobalCodes();
  }

  private refreshGlobalCodes(): void{
    if( !!this.author )
      this.globalGetItemsSubscription = this.global.getStates( this.author ).subscribe(items => {
        console.log('devss loginservice get', items);
        this._items = items;
        this.skip = items.length;
      });
  }

  public next(): void{
    if( !!this.author )
      this.globalGetItemsSubscription = this.global.getStates( this.author, this.skip ).subscribe( items => {
        items.length && this._items.push(...items);
        this.skip += items.length;
        if(!items.length) this.nomore = true;
      });
  }

  public removeBlogItem( id: string ){
    
  }

  ngOnChanges(sc: SimpleChanges){
    if(!!sc['author'].currentValue && sc['author'].currentValue !== sc['author'].previousValue){
      if( this.globalGetItemsSubscription ) this.globalGetItemsSubscription.unsubscribe();
      this.refreshGlobalCodes();
    }
    this.ownerMode = (this.auth.authorizedAs() === this.author) ? true : false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if( this._globalSubscripton ) this._globalSubscripton.unsubscribe();
    if( this.globalGetItemsSubscription ) this.globalGetItemsSubscription.unsubscribe();
  }
}
