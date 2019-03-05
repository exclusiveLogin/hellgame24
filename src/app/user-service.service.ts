import {Injectable} from '@angular/core';
import {IUser} from './models/user-interface';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IUserState} from './models/users-state-interface';
import {DomSanitizer} from '@angular/platform-browser';
import { IStatusBtn, IUserStatus } from './dashboard/user-status/user-status.component';
import { ConnectorService } from './services/connector.service';
import { Path } from './models/path';

let path: Path = {
  segment: 'status',
  script: 'status_handler.php'
};

@Injectable()
export class UserServiceService {

  private fetchedUsers: IUser[];

  constructor(
    private http: HttpClient,
    private apiservice: ApiService,
    private sanitizer: DomSanitizer,
    private con: ConnectorService,
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
    
          return <IUser>{
            login: user.login,
            title: user.title,
            message: {
              text: user.status && user.status[0] && user.status[0].title,
              datetime: user.status && user.status[0] && user.status[0].datetime_create,
              icon: user.status && user.status[0] && user.status[0].status,
            },
            name: user.name,
            status: st,
            avatar_min: this.sanitizer.bypassSecurityTrustStyle(`url(assets/${user.img_min})`),
            avatar_min_url: this.sanitizer.bypassSecurityTrustUrl(`assets/${user.img_min}`),
            avatar_big: this.sanitizer.bypassSecurityTrustUrl(`assets/${user.img_big}`),
            emotion_current: ( quickEmo.length > 1 ) ? user.emo_trend[0].value : null,
            emotion_last: ( quickEmo.length > 1 ) ? user.emo_trend[1].value : null,
            emotion_current_datetime: ( quickEmo.length > 1 ) ? user.emo_trend[0].datetime : null,
            emotion_last_datetime: ( quickEmo.length > 1 ) ? user.emo_trend[1].datetime : null,
            last_change_datetime: user.upd,
            last_change_status_datetime: user.status && user.status[0] && user.status[0].datetime_create,
            emo_trend: quickEmo
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

  public setUserStatus( status: IStatusBtn, user: string){

    let body: IUserStatus = {
      login: user,
      status: status.icon,
      title: status.title,
      class: status.class,
      mode: 'add_status',
    };

    this.con.setData( path , { body }).subscribe();

  }

  public setUserEmo(){

  }

  public refreshUsers(){
    this.fetchedUsers = null;
    return this.getUsersInit();
  }
}
