import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import {UxEventerService} from './ux-eventer.service';
import {UserServiceService} from './user-service.service';
import {LsService} from './ls.service';
import {TopEventsService} from './topevents.service';
import {LoginService} from './login.service';
import {filter, tap} from 'rxjs/operators';
import {IUser} from 'app/models/user-interface';

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

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        public http: HttpClient,
        public api: ApiService,
        private router: Router,
        private uxevent: UxEventerService,
        private user: UserServiceService,
        private ls: LsService,
        private tes: TopEventsService,
        private loginService: LoginService,
    ) {
        console.log('AUTH SERVICE', this);
    }

    private isLoggedSuccess = false;
    private currentAuthorizedLogin: string = null;
    private currentAuthorizedUser: IUser = null;

    public login(login: ILogin) {
        if (login && login.login && login.password) {

            const api: string = this.api.getApi();
            return this.http.get(api + 'enter.php', {
                    params: {
                        login: login.login,
                        password: login.password
                    }
                }
            ).pipe(
                tap((response: ILoginResponse) => {

                    if (response) {
                        this.isLoggedSuccess = response.auth;
                        this.currentAuthorizedLogin = response && response.login;
                    }
                    if (response.auth) {
                        this.user.getUser(response.login).pipe(
                            tap(user => this.currentAuthorizedUser = user),
                        ).subscribe(user => this.uxevent.setLoginEvent(user));
                        this.ls.setUserCredential(login);
                        this.tes.refreshSegmentWithData('login', response.login);
                    } else {
                        this.uxevent.setLoginErrorEvent(login.login);
                        this.ls.unsetUserCredential();
                        this.tes.refreshSegmentWithData('login', null);
                        // this.tes.refreshSegment('status');
                    }
                    const pr_nav: Promise<Position> = new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(position => resolve(position), error => reject(error));
                    });

                    pr_nav
                        .then(nav => {
                            this.loginService.setNewLoginData(response.login, null, nav);
                        }).catch(err => console.log('get navigation error:', err));

                    navigator['getBattery'] && navigator['getBattery']()
                        .then(bat => this.loginService.setNewLoginData(response.login, bat && bat.level));

                },
                    (e) => {
                        console.log('loginError: ', e);
                        this.uxevent.setLoginErrorEvent(login.login);
                    }),
            );
        }
    }

    public logout() {
        this.user.getUser(this.currentAuthorizedLogin).pipe(
            filter(user => !user.silent)
        ).subscribe(user => this.uxevent.setLogoutEvent(user));
        this.isLoggedSuccess = false;
        this.currentAuthorizedLogin = null;
        this.ls.unsetUserCredential();
        this.router.navigate(['login']);
    }

    public isAuthorized(): boolean {
        return this.isLoggedSuccess;
    }

    public authorizedAs(): string {
        return this.currentAuthorizedLogin;
    }

    public authorizedUser(): IUser {
        return this.currentAuthorizedUser as IUser;
    }

    public adminMode(): boolean {
        return this.currentAuthorizedUser?.admin;
    }
}
