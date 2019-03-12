import {Injectable} from '@angular/core';
import {IUser, IUserEmo, ITrendItem} from '../models/user-interface';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IUserState} from '../models/users-state-interface';
import {DomSanitizer} from '@angular/platform-browser';
import { IStatusBtn, IUserStatus } from '../dashboard/user-module/user-status/user-status.component';
import { ConnectorService, IParams } from './connector.service';
import { Path } from '../models/path';
import { TopEventsService } from './topevents.service';
import { filter, tap, map } from 'rxjs/operators';
import { ConnectorWrapperService } from './connector-wrapper.service';


@Injectable()
export class UserServiceService {

  private fetchedUsers: IUser[];
  private usersTrends: ITrendItem[][] = [];

  constructor(
    private http: HttpClient,
    private apiservice: ApiService,
    private sanitizer: DomSanitizer,
    private con: ConnectorService,
    private tes: TopEventsService,
  ) { 
      console.log("USERS SERVICE", this);
      this.tes.getSegmentRefreshSignal('emo').subscribe( state => {
        !!state && this.clearTrendCache();
      });
  }
  public getUsersInit(): Observable<IUser[]> {

    if( this.fetchedUsers ) return Observable.of( this.fetchedUsers );

    return this.http.get<IUserState[]>(this.apiservice.getApi() + 'users_state.php')
      .map((users) => {
        let users_result: IUser[] = users.map((user: IUserState) => {
          let st = 'Не играет';
          if (user.online && user.played) {
            if (!!Number(user.online)) {
              st = 'онлайн';
            } else if (!!Number(user.played)) {
              st = 'играет';
            }
          }

          let returned_user: IUser = {
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
            last_change_datetime: user.upd,
            last_change_status_datetime: user.status && user.status[0] && user.status[0].datetime_create,
            emo_trend: null,
            last_emo_status: null,
          };
      
          return returned_user;

        });

        this.fetchedUsers = users_result;
      
        return users_result;
      });
  }

  public getUser(id: string): Observable<IUser> {
    if ( this.fetchedUsers ) return Observable.of( this.fetchedUsers.find( user => user.login === id) );
    return this.getUsersInit().map(users => users.find(u => u.login === id));
  }

  public setUser( user: IUser ): void {
    let targetUserInCache = this.fetchedUsers && this.fetchedUsers.find( u => u.login === user.login);

    if ( targetUserInCache ) targetUserInCache = JSON.parse(JSON.stringify(user));
  
  }

  public getUserTrendCache(user: string): ITrendItem[]{
    return this.usersTrends && this.usersTrends[user];
  }

  public setUserTrendCache(user: string, trend: ITrendItem[]){
    if (this.usersTrends) this.usersTrends[user] = trend;
  }

  public clearUserTrendCache( user: string ): void{
    if (this.usersTrends) delete this.usersTrends[user];
  }

  public clearTrendCache(): void{
    this.usersTrends = [];
  }

  public getUserTrend( user: string ){
    let cached = this.getUserTrendCache(user);

    console.log("CASHED:", cached);

    if( cached ) return Observable.of( cached );

    let path: Path = {
      segment: 'emo',
      script: 'emo_handler.php'
    };

    let data: IParams = {
      mode: 'get_trend',
      login: user
    }

    
    return this.con.getData<ITrendItem[]>( path, data ).pipe(
      filter(trend => !!trend), 
      map(t => {
        t.sort((tip: ITrendItem, tin: ITrendItem) => Number(tin.id) - Number(tip.id) );
        console.log("SORTED 1:", t);
        this.setUserTrendCache(user, [].concat(t));
        return t;
      }));

  }

  public setUserStatus( status: IStatusBtn, user: string){
    let path: Path = {
      segment: 'status',
      script: 'status_handler.php'
    };

    let body: IUserStatus = {
      login: user,
      status: status.icon,
      title: status.title,
      class: status.class,
      mode: 'add_status',
    };

    this.con.setData( path , { body }).subscribe();

  }

  public setUserEmo(o:{value: number, title: string, login: string}){

    let path: Path = {
      segment: 'emo',
      script: 'emo_handler.php'
    };

    let body: IUserEmo = {
      value: o.value,
      title: o.title,
      login: o.login,
      mode: 'add_emo',
    }


    this.con.setData(path, {body}).subscribe();
  }

  public refreshUsers(){
    this.fetchedUsers = null;
    return this.getUsersInit();
  }
}
