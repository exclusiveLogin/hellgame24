import {Injectable} from '@angular/core';
import {
    IUser,
    IUserEmo,
    ITrendItem,
    ILoginLog
} from '../models/user-interface';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {Observable, of} from 'rxjs';
import {IUserState} from '../models/users-state-interface';
import {DomSanitizer} from '@angular/platform-browser';
import {IStatusBtn, IUserStatus} from '../dashboard/user-module/user-status/user-status.component';
import {IParams} from './connector.service';
import {Path} from '../models/path';
import {TopEventsService} from './topevents.service';
import {filter, map, take} from 'rxjs/operators';
import * as moment from 'moment';
import {DadataService} from './dadata.service';
import {ConnectorWrapperService} from './connector-wrapper.service';


@Injectable({providedIn: 'root'})
export class UserServiceService {

    private fetchedUsers: IUser[];
    private usersTrends: ITrendItem[][] = [];

    constructor(
        private http: HttpClient,
        private apiservice: ApiService,
        private sanitizer: DomSanitizer,
        private con: ConnectorWrapperService,
        private tes: TopEventsService,
        private dadata: DadataService,
    ) {
        console.log('USERS SERVICE', this);
        this.tes.getSegmentRefreshSignal('emo').subscribe(state => {
            !!state && this.clearTrendCache();
        });

        this.tes.getSegmentRefreshSignal('stable').pipe(take(2)).subscribe(state => {
            !!state && this.startRefresher();
        });

    }

    public startRefresher() {

        setInterval(() => {
            console.log('status refrresh');
            this.tes.refreshSegment('status');
        }, 60000);

        this.tes.refreshSegment('status');
    }

    public oldDate(date: string): boolean {
        const old = moment().isAfter(moment.utc(Number(date)).add(20, 'second'));
        return old;
    }

    public getUsersInit(): Observable<IUser[]> {

        if (this.fetchedUsers) {
            return of(this.fetchedUsers);
        }

        return this.http.get<IUserState[]>(this.apiservice.getApi() + 'users_state.php').pipe(
            map((users) => {
                const users_result: IUser[] = users.map((user: IUserState) => {
                    let st = 'Не играет';

                    if (user.upd && !this.oldDate(user.upd)) {
                        st = 'онлайн';
                        user.online = true;
                    } else {
                        st = 'не в сети';
                        user.online = false;
                    }


                    const returned_user: IUser = {
                        login: user.login,
                        title: user.title,
                        silent: !!user.silent,
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
                        last_change_datetime_humanity: user.upd ? moment.utc(Number(user.upd)).utcOffset(3)
                            .format('DD.MM.YYYY HH:mm') : null,
                        last_change_status_datetime: user.status && user.status[0] && user.status[0].datetime_create,
                        emo_trend: null,
                        last_emo_status: null,
                        online: user.online,
                        last_login: user.last_login && user.last_login[0],
                    };

                    this.getAddressFromDadata(returned_user);

                    return returned_user;

                });

                this.fetchedUsers = users_result;

                return users_result;
            }),
        );

    }

    public getUser(id: string): Observable<IUser> {
        const targetUser = this.fetchedUsers && this.fetchedUsers.find(user => user.login === id);
        if (targetUser) {
            return of(targetUser);
        }
        return this.getUsersInit().pipe(
            map(users => users.find(u => u.login === id))
        );
    }

    public setUser(user: IUser): void {
        let targetUserInCache = this.fetchedUsers && this.fetchedUsers.find(u => u.login === user.login);

        if (targetUserInCache) {
            targetUserInCache = JSON.parse(JSON.stringify(user));
        }

    }

    public getUserTrendCache(user: string): ITrendItem[] {
        return this.usersTrends && this.usersTrends[user];
    }

    public setUserTrendCache(user: string, trend: ITrendItem[]) {
        if (this.usersTrends) {
            this.usersTrends[user] = trend;
        }
    }

    public clearUserTrendCache(user: string): void {
        if (this.usersTrends) {
            delete this.usersTrends[user];
        }
    }

    public clearTrendCache(): void {
        this.usersTrends = [];
    }

    public getFullTrend(user: string) {
        return this.getUserTrend(user, null, 5000);
    }

    public getUserTrend(user: string, skip: number = null, limit = null) {

        const cached = !skip && !limit && this.getUserTrendCache(user);

        // console.log("CASHED:", cached);

        if (cached) {
            return of(cached);
        }

        const path: Path = {
            segment: 'emo',
            script: 'emo_handler.php'
        };

        const data: IParams = {
            mode: 'get_trend',
            login: user,
        };

        if (skip) {
            data.skip = skip;
        }
        if (limit) {
            data.limit = limit;
        }


        return this.con.getData<ITrendItem[]>(path, data).pipe(
            filter(trend => !!trend),
            map(t => {
                t.sort((tip: ITrendItem, tin: ITrendItem) => Number(tin.id) - Number(tip.id));
                // console.log("SORTED 1:", t);
                this.setUserTrendCache(user, [].concat(t));
                return t;
            }));

    }

    public setUserStatus(status: IStatusBtn, user: string) {
        const path: Path = {
            segment: 'status',
            script: 'status_handler.php'
        };

        const body: IUserStatus = {
            login: user,
            status: status.icon,
            title: status.title,
            class: status.class,
            mode: 'add_status',
        };

        return this.con.setData(path, {body});

    }

    public getUserStatus(user: string, skip: number = null): Observable<IUserStatus[]> {
        const path: Path = {
            segment: 'status',
            script: 'status_handler.php'
        };

        const params: IParams = (!!skip) ? {
            login: user,
            mode: 'get_status',
            limit: 10,
            skip
        } : {
            login: user,
            mode: 'get_status',
            limit: 10
        };

        return this.con.getData<IUserStatus[]>(path, params);
    }

    public setUserEmo(o: { value: number, title: string, login: string }) {

        const path: Path = {
            segment: 'emo',
            script: 'emo_handler.php'
        };

        const body: IUserEmo = {
            value: o.value,
            title: o.title,
            login: o.login,
            mode: 'add_emo',
        };

        return this.con.setData(path, {body});
    }

    public refreshUsers() {
        this.fetchedUsers = null;
        return this.getUsersInit();
    }

    public getAddressFromDadata(user: IUser): void {
        if (user && user.last_login && (user.last_login.accuracy && user.last_login.position_lat && user.last_login.position_lon)) {
            this.dadata.getAddressesFromLocation(user.last_login.position_lat, user.last_login.position_lon, user.last_login.accuracy)
                .subscribe(address => user.address = !!address ? address : null);
        }
    }

    public getLoginsLog(login: string, skip: number = null): Observable<ILoginLog[]> {
        const path: Path = {
            segment: 'login',
            script: 'loginhandler.php'
        };

        const params: IParams = skip ? {
            login,
            skip,
            mode: 'get_logins'
        } : {
            login,
            mode: 'get_logins'
        };

        return this.con.getData<ILoginLog[]>(path, params);
    }
}
