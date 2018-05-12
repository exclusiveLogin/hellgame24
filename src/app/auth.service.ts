import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

interface ILogin {
  login: string;
  password: string;
}
interface ILoginResponse {
  auth: boolean;
  login: string;
  id: string;
  user_title: string;
  msg: string;
}
@Injectable()
export class AuthService {

  constructor(public http: HttpClient, public api: ApiService, private router: Router) { }
  private isLoggedSuccess = false;
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
          }
          if (response.auth) {
            this.router.navigate(['dashboard']);
          }
        },
          (e) => {
            console.log('loginError: ', e);
          });
    }
  }
  public isAuthorized(): boolean {
    return this.isLoggedSuccess;
  }
}
