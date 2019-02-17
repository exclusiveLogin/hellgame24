import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { AuthguardGuard } from './authguard.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserServiceService } from './user-service.service';
import { TopEventsService } from './topevents.service';
import { ChartReflowerService } from './chart-reflower.service';
import { SystemCodeComponent } from './system-code/system-code.component';
import { GlobalService } from './global.service';
import { StateService } from './services/state.service';
import { ConnectorService } from './services/connector.service';
import { ServicesService } from './services.service';
import { BlogService } from './services/blog.service';
import { UiService } from './services/ui.service';
import { MessageService } from './services/message.service';
import { MailServiceService } from './services/mail-service.service';

let dashboardRoutes: Routes = [
  { path: '', redirectTo:'default', pathMatch: 'full' },
  { path: ':user', component: DashboardComponent },
];

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard]},
  {path: 'dashboard/:user', component: DashboardComponent, canActivate: [AuthguardGuard]},
  //{path: 'dashboard', component: DashboardComponent, /*,*/ children: dashboardRoutes},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    NotfoundComponent,
    SystemCodeComponent,
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
    TopEventsService,
    ChartReflowerService,
    GlobalService,
    StateService,
    ConnectorService,
    ServicesService,
    BlogService,
    MessageService,
    UiService,
    MailServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
