import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsercardComponent} from './usercard/usercard.component';
import {DashboardComponent} from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UsercardledComponent } from './usercard/usercardled/usercardled.component';
import { MessangerComponent } from './messanger/messanger.component';
import {AccessoryModule} from '../accessory/accessory.module';
import {PagerComponent} from './pager/pager.component';
import { UserInfoCardComponent } from './user-info-card/user-info-card.component';
import { UserNotyfierComponent } from './user-notyfier/user-notyfier.component';
import { DashMapComponent } from './dash-map/dash-map.component';
import { UserEmotionTrendComponent } from './user-emotion-trend/user-emotion-trend.component';
import { UserBlogComponent } from './user-blog/user-blog.component';
import {ChartModule} from 'angular-highcharts';
import { UserBlogItemComponent } from './user-blog/user-blog-item/user-blog-item.component';
import { UserMessageComponent } from './user-message/user-message.component';
import { UserMessageItemComponent } from './user-message/user-message-item/user-message-item.component';
import { UserMailComponent } from './user-mail/user-mail.component';
import { UserMailGroupComponent } from './user-mail/user-mail-group/user-mail-group.component';
import { UserMailItemComponent } from './user-mail/user-mail-group/user-mail-item/user-mail-item.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AccessoryModule,
    ChartModule,
    //RouterModule.forChild(routes),
  ],
  exports: [
    //DashboardComponent
  ],
  declarations: [
    DashboardComponent,
    UsercardComponent,
    UsercardledComponent,
    MessangerComponent,
    PagerComponent,
    UserInfoCardComponent,
    UserNotyfierComponent,
    DashMapComponent,
    UserEmotionTrendComponent,
    UserBlogComponent,
    UserBlogItemComponent,
    UserMessageComponent,
    UserMessageItemComponent,
    UserMailComponent,
    UserMailGroupComponent,
    UserMailItemComponent,
  ]
})
export class DashboardModule { }
