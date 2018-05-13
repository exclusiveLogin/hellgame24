import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsercardComponent} from './usercard/usercard.component';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';

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
    UsercardComponent
  ]
})
export class DashboardModule { }
