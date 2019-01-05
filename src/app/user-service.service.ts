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

  private fetchedUsers: IUser[];

  constructor(
    private http: HttpClient,
    private apiservice: ApiService,
    private sanitizer: DomSanitizer
  ) { }
  public getUsersInit(): Observable<IUser[]> {

    if( this.fetchedUsers ) return Observable.of( this.fetchedUsers );

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

          let quickEmo = user.emo_trend && user.emo_trend.length ? [].concat(user.emo_trend).sort((p, n) => Number(p.id) - Number(n.id)) : [];
          if( quickEmo.length > 1 ) {
            user.emotion = user.emo_trend[0].value;
            user.emo_current_datetime = user.emo_trend[0].datetime;
            user.old_emotion = user.emo_trend[1].value;
            user.emo_last_datetime = user.emo_trend[1].datetime;
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
            avatar_min_url: this.sanitizer.bypassSecurityTrustUrl(`assets/${user.img_min}`),
            avatar_big: this.sanitizer.bypassSecurityTrustUrl(`assets/${user.img_big}`),
            emotion_current: user.emotion,
            emotion_last: user.old_emotion,
            emotion_current_datetime: user.emo_current_datetime,
            emotion_last_datetime: user.emo_last_datetime,
            last_change_datetime: user.upd,
            last_change_status_datetime: user.upd_status,
            emo_trend: quickEmo,
          };
        });
        this.fetchedUsers = users_result;
        return users_result;
      });
  }

  public getUser(id: string): Observable<IUser> {
    if ( this.fetchedUsers ) return Observable.of( this.fetchedUsers.find( user => user.login === id) );
    return this.getUsersInit().map(users => users.find(u => u.login === id));
  }
}
