import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopEventsService } from '../../services/topevents.service';
import { Subscription } from 'rxjs';
import { ITrendItem } from '../../models/user-interface';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-emo-log',
  templateUrl: './user-emo.component.html',
  styleUrls: ['./user-emo.component.css']
})
export class UserEmoComponent implements OnInit, OnChanges {

  public _items: ITrendItem[] = [];
  private _emoSubscripton: Subscription;
  private emoGetItemsSubscription: Subscription;

  @Input() public height: number = 400;

  @Input() public author: string;

  public ownerMode: boolean = false;

  private skip = 0;
  public nomore = false;

  @Input() public title = 'Эмоции пользователя';
  constructor(
    private emoService: UserServiceService,
    private tes: TopEventsService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this._emoSubscripton = this.tes.getSegmentRefreshSignal( 'emo' )
      .subscribe( refreshFlag => {
        console.log('devss REFRESH FLAG', refreshFlag);
        Promise.resolve().then(()=>this.refreshEmo());
      } );



    this.refreshEmo();
  }

  private refreshEmo(): void{
    if( !!this.author )
      this.emoGetItemsSubscription = this.emoService.getUserTrend( this.author ).subscribe(items => {
        console.log('devss emoservice get', items);
        this._items = items;
        this.skip = items.length;
      });
  }

  public next(): void{
    if( !!this.author )
      this.emoGetItemsSubscription = this.emoService.getUserTrend(this.author, this.skip).subscribe( items => {
        items.length && this._items.push(...items);
        this.skip += items.length;
        if(!items.length) this.nomore = true;
      });
  }

  public removeBlogItem( id: string ){
    
  }

  ngOnChanges(sc: SimpleChanges){
    if(!!sc['author'].currentValue && sc['author'].currentValue !== sc['author'].previousValue){
      if( this.emoGetItemsSubscription ) this.emoGetItemsSubscription.unsubscribe();
      this.refreshEmo();
    }
    this.ownerMode = (this.auth.authorizedAs() === this.author) ? true : false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if( this._emoSubscripton ) this._emoSubscripton.unsubscribe();
    if( this.emoGetItemsSubscription ) this.emoGetItemsSubscription.unsubscribe();
  }
}
