import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BlogService, IBlogData } from '../../../services/blog.service';
import { TopEventsService } from '../../../services/topevents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.css']
})
export class UserBlogComponent implements OnInit, OnChanges {

  public _blogItems: IBlogData[] = [];
  private _blogSubscripton: Subscription;
  private blogGetItemsSubscription: Subscription;

  @Input() public blogHeight = 400;

  @Input() public author: string;

  public ownerMode = false;

  @Input() public title = 'Личные заметки';
  constructor(
    private blogService: BlogService,
    private tes: TopEventsService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this._blogSubscripton = this.tes.getSegmentRefreshSignal( 'blog' )
      .subscribe( refreshFlag => {
        console.log('devss REFRESH FLAG', refreshFlag);
        Promise.resolve().then(() => this.refreshBlog());
      } );



    this.refreshBlog();
  }

  private refreshBlog(): void {
    if ( !!this.author ) {
      this.blogGetItemsSubscription = this.blogService.getData<IBlogData[]>(this.author ? {author: this.author} : null).subscribe(items => {
        console.log('devss blogservice get', items);
        this._blogItems = items;
      });
    }
  }

  public removeBlogItem( id: string ) {
    const body = { operation: 'remove', id};
    this.blogService.setData( body ).subscribe(result => this.tes.refreshSegment( 'blog' ));
  }

  ngOnChanges(sc: SimpleChanges) {
    if (!!sc['author'].currentValue && sc['author'].currentValue !== sc['author'].previousValue) {
      if ( this.blogGetItemsSubscription ) { this.blogGetItemsSubscription.unsubscribe(); }
      this.refreshBlog();
    }
    this.ownerMode = (this.auth.authorizedAs() === this.author) ? true : false;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if ( this._blogSubscripton ) { this._blogSubscripton.unsubscribe(); }
    if ( this.blogGetItemsSubscription ) { this.blogGetItemsSubscription.unsubscribe(); }
  }
}
