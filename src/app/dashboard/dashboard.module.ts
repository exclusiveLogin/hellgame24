import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsercardComponent} from './usercard/usercard.component';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import { UsercardledComponent } from './usercard/usercardled/usercardled.component';
import { MessangerComponent } from './user-info-card/messanger/messanger.component';
import {AccessoryModule} from '../accessory/accessory.module';
import {PagerComponent} from './pager/pager.component';
import { UserInfoCardComponent } from './user-info-card/user-info-card.component';
import { UserNotyfierComponent } from './user-notyfier/user-notyfier.component';
import { DashMapComponent } from './dash-map/dash-map.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AccessoryModule
  ],
  exports: [
    UsercardComponent,
    DashboardComponent
  ],
  declarations: [
    DashboardComponent,
    UsercardComponent,
    UsercardledComponent,
    MessangerComponent,
    PagerComponent,
    UserInfoCardComponent,
    UserNotyfierComponent,
    DashMapComponent
  ]
})
export class DashboardModule { }
