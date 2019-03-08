import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AccessoryModule } from '../accessory/accessory.module';
import { PagerComponent } from './pager/pager.component';
import { DashMapComponent } from './dash-map/dash-map.component';
import { ChartModule } from 'angular-highcharts';
import { UserModuleModule } from './user-module/user-module.module';
import { MessangerComponent } from './messanger/messanger.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AccessoryModule,
    ChartModule,
    UserModuleModule,
  ],
  exports: [
    UserModuleModule,
  ],
  declarations: [
    DashboardComponent,
    PagerComponent,
    DashMapComponent,
    MessangerComponent,
  ]
})
export class DashboardModule { }
