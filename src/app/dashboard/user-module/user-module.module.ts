import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardModule } from '../../usercard/usercard.module';
import { UserStatusModule } from './user-status/user-status.module';
import { UserBlogModule } from './user-blog/user-blog.module';
import { UserEmoModule } from './user-emo/user-emo.module';
import { UserInfoCardModule } from './user-info-card/user-info-card.module';
import { UserMailModule } from './user-mail/user-mail.module';
import { UserMessageModule } from './user-message/user-message.module';
import { UserNotifierModule } from './user-notyfier/user-notyfier.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserBlogModule,
    UserEmoModule,
    UserInfoCardModule,
    UserMailModule,
    UserMessageModule,
    UserNotifierModule,
    UserStatusModule,
    UserCardModule,
  ],
  declarations: [

  ],
  exports: [
    UserBlogModule,
    UserEmoModule,
    UserInfoCardModule,
    UserMailModule,
    UserMessageModule,
    UserNotifierModule,
    UserStatusModule,
    UserCardModule,

  ]
})
export class UserModuleModule { }
