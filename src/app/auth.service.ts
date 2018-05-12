import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ApiService} from './api.service';

interface ILogin {
  login: string;
  password: string;
}
@Injectable()
export class AuthService {

  constructor(public http: HttpClient, public api: ApiService) { }
  public login(login: ILogin) {
    if (login && login.login && login.password) {
      const api: string = this.api.getApi();
      this.http.get(api + 'enter.php', {
        params: {
          login: login.login,
          password: login.password
        }
      })
        .subscribe((response: HttpResponse<string>) => {
          console.log('response login: ', response);
        },
          (e) => {
            console.log('loginError: ', e);
          });
    }
  }
}
