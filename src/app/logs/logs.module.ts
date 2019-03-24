import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs.component';
import { PagerComponent } from './pager/pager.component';
import { Routes, RouterModule } from '@angular/router';
import { UserCardModule } from '../usercard/usercard.module';
import { UserBlogModule } from './user-blog/user-blog.module';
import { UserEmoModule } from './user-emo/user-emo.module';
import { UserLoginsModule } from './user-logins/user-logins.module';


const routes: Routes = [{ path: '', component: LogsComponent }];

@NgModule({
  imports: [
    CommonModule,
    UserCardModule,
    UserBlogModule,
    UserEmoModule,
    UserLoginsModule,
    RouterModule.forChild( routes ),
  ],
  declarations: [
    LogsComponent,
    PagerComponent
  ]
})
export class LogsModule { }
