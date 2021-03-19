import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { AuthguardGuard } from './authguard.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserServiceService } from './services/user-service.service';
import { TopEventsService } from './services/topevents.service';
import { ChartReflowerService } from './services/chart-reflower.service';
import { SystemCodeComponent } from './system-code/system-code.component';
import { GlobalService } from './services/global.service';
import { StateService } from './services/state.service';
import { ConnectorService } from './services/connector.service';
import { ServicesService } from './services/services.service';
import { BlogService } from './services/blog.service';
import { UiService } from './services/ui.service';
import { MessageService } from './services/message.service';
import { MailServiceService } from './services/mail-service.service';
import { UpdaterService } from './services/updater.service';
import { UxEventerService } from './services/ux-eventer.service';
import { LsService } from './services/ls.service';
import { ConnectorWrapperService } from './services/connector-wrapper.service';

let dashboardRoutes: Routes = [
  { path: '', redirectTo:'default', pathMatch: 'full' },
  { path: ':user', component: DashboardComponent },
];

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthguardGuard]},
  {path: 'dashboard/:user', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthguardGuard]},
  {path: 'logs', loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule), canActivate: [AuthguardGuard]},
  {path: 'logs/:user', loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule), canActivate: [AuthguardGuard]},
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
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    ConnectorWrapperService,
    ServicesService,
    BlogService,
    MessageService,
    UiService,
    MailServiceService,
    UpdaterService,
    UxEventerService,
    LsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
