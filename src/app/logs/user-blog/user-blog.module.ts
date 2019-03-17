import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBlogComponent } from './user-blog.component';
import { UserBlogItemComponent } from './user-blog-item/user-blog-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserBlogComponent,
    UserBlogItemComponent
  ],
  exports:[
    UserBlogComponent,
    UserBlogItemComponent
  ]
})
export class UserBlogModule { }
