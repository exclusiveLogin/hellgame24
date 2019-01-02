import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BlogService, IBlogData } from '../../services/blog.service';
import { TopEventsService } from '../../topevents.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.css']
})
export class UserBlogComponent implements OnInit, OnChanges {

  public _blogItems: IBlogData[] = [];

  @Input() public blogHeight: number = 400;

  @Input() public author: string;

  @Input() public title = 'Личные заметки';
  constructor(
    private blogService: BlogService,
    private tes: TopEventsService,
  ) { }

  ngOnInit() {
    this.tes.getSegmentRefreshSignal( 'blog' )
      .subscribe( refreshFlag => {
        console.log('devss REFRESH FLAG', refreshFlag);
        Promise.resolve().then(()=>this.refreshBlog());
      } )
    
    this.refreshBlog();
  }

  private refreshBlog(): void{
    this.blogService.getData<IBlogData[]>(this.author ? {author:this.author} : null).subscribe(items => {
      console.log('devss blogservice get', items);
      this._blogItems = items;
    });
  }

  ngOnChanges(sc: SimpleChanges){
    if(!!sc['author'].currentValue && sc['author'].currentValue !== sc['author'].previousValue){
      this.refreshBlog();
    }
  }
}
