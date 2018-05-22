import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ApiService} from './api.service';
import {AuthguardGuard} from './authguard.guard';
import {DashboardModule} from './dashboard/dashboard.module';
import {UserServiceService} from './user-service.service';
import { PagerComponent } from './dashboard/pager/pager.component';
import {TopeventsService} from './topevents.service';
import {ChartReflowerService} from './chart-reflower.service';
import { SystemCodeComponent } from './system-code/system-code.component';

const dashboardRoutes: Routes = [
  {path: 'pager', component: PagerComponent}
];

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, /*canActivate: [AuthguardGuard],*/ children: dashboardRoutes},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    NotfoundComponent,
    SystemCodeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    DashboardModule,
  ],
  providers: [
    AuthService,
    ApiService,
    AuthguardGuard,
    UserServiceService,
    TopeventsService,
    ChartReflowerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
