import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsercardComponent} from './usercard/usercard.component';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import { UsercardledComponent } from './usercard/usercardled/usercardled.component';
import { MessangerComponent } from './messanger/messanger.component';
import {PagerComponent} from "./pager/pager.component";
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
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
    MapComponent
  ]
})
export class DashboardModule { }
