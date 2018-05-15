import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsercardComponent} from './usercard/usercard.component';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import { UsercardledComponent } from './usercard/usercardled/usercardled.component';

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
    UsercardledComponent
  ]
})
export class DashboardModule { }
