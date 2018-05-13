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

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'meteo', component: MeteoComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    MapComponent,
    MeteoComponent,
    NotfoundComponent,
    LoginComponent,
    UsercardComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
