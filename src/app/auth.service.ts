import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import { UxEventerService } from './ux-eventer.service';
import { UserServiceService } from './user-service.service';
import { LsService } from './ls.service';

export interface ILogin {
  login: string;
  password: string;
}
export interface ILoginResponse {
  auth: boolean;
  login: string;
  id: string;
  user_title: string;
  msg: string;
}
@Injectable()
export class AuthService {

  constructor(
    public http: HttpClient, 
    public api: ApiService, 
    private router: Router,
    private uxevent: UxEventerService,
    private user: UserServiceService,
    private ls: LsService
    ) {
      console.log('AUTH SERVICE', this);
    }
  private isLoggedSuccess = false;
  private currentAuthorizedLogin: string = null;

  public login(login: ILogin) {
    if (login && login.login && login.password) {
      const api: string = this.api.getApi();
      this.http.get(api + 'enter.php', {
        params: {
          login: login.login,
          password: login.password
        }
      })
        .subscribe((response: ILoginResponse) => {
          console.log('response login: ', response);
          if (response) {
            this.isLoggedSuccess = response.auth;
            this.currentAuthorizedLogin = response && response.login;
          }
          if (response.auth) {
            this.router.navigate(['dashboard']);
            this.user.getUser( response.login ).subscribe( user => this.uxevent.setLoginEvent( user ));
            this.ls.setUserCredential( login );
          } else {
            this.uxevent.setLoginErrorEvent( login.login );
            this.ls.unsetUserCredential();
          }
        },
          (e) => {
            console.log('loginError: ', e);
            this.uxevent.setLoginErrorEvent( login.login );
          });
    }
  }

  public logout(){
    this.user.getUser( this.currentAuthorizedLogin ).subscribe( user => this.uxevent.setLogoutEvent( user ));
    this.isLoggedSuccess = false;
    this.currentAuthorizedLogin = null;
    this.ls.unsetUserCredential();
    this.router.navigate(['dashboard']);
  }

  public isAuthorized(): boolean {
    return this.isLoggedSuccess;
  }
  public authorizedAs(): string {
    return this.currentAuthorizedLogin;
  }
}
