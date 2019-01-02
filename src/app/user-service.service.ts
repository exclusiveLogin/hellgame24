import {Injectable} from '@angular/core';
import {IUser} from './models/user-interface';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IUserState} from './models/users-state-interface';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class UserServiceService {

  constructor(
    private http: HttpClient,
    private apiservice: ApiService,
    private sanitizer: DomSanitizer
  ) { }
  public getUsersInit(): Observable<IUser[]> {
    return this.http.get<IUserState[]>(this.apiservice.getApi() + 'users_state.php')
      .map((users) => {
        const users_result: IUser[] = users.map((user: IUserState) => {
          let st = 'Не играет';
          if (user.online && user.played) {
            if (!!Number(user.online)) {
              st = 'онлайн';
            } else if (!!Number(user.played)) {
              st = 'играет';
            }
          }
          return <IUser>{
            login: user.login,
            title: user.title,
            message: {
              text: user.status_msg,
              datetime: user.upd,
              icon: user.status_code
            },
            name: user.name,
            status: st,
            avatar_min: this.sanitizer.bypassSecurityTrustStyle(`url(assets/${user.img_min})`),
            avatar_big: this.sanitizer.bypassSecurityTrustUrl(`assets/${user.img_big}`),
            emotion_current: user.emotion,
            emotion_last: user.old_emotion,
            last_change_datetime: user.upd,
            last_change_status_datetime: user.upd_status,
          };
        });
        return users_result;
      });
  }
  /*public getUser(id: string): IUser {

  }*/
}
