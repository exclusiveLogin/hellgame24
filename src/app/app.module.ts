import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { MeteoComponent } from './meteo/meteo.component';
import {RouterModule, Routes} from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ApiService} from './api.service';
import {AuthguardGuard} from './authguard.guard';
import { UsercardComponent } from './dashboard/usercard/usercard.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {UserServiceService} from './user-service.service';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    NotfoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    DashboardModule
  ],
  providers: [
    AuthService,
    ApiService,
    AuthguardGuard,
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
