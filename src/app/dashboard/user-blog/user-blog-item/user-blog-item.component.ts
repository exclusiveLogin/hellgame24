import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IBlogData } from '../../../services/blog.service';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-user-blog-item',
  templateUrl: './user-blog-item.component.html',
  styleUrls: ['./user-blog-item.component.css']
})
export class UserBlogItemComponent implements OnInit {

  @Output() removeMessageEvent = new EventEmitter<boolean>();

  @Input() ownerMode: boolean = false;

  @Input() public item: IBlogData =  {
    title: "Заголовок не задан",
    text_field: '-',
    datetime: '--,--,--',
    id: '#unknown'
  };
  constructor() { }

  ngOnInit() {
  }

  public removeThisMessage(){
    if( confirm('Точно удалить?')) this.removeMessageEvent.emit(true);
  };
}
