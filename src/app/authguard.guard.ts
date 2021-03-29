import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './services/auth.service';
import {LsService} from 'app/services/ls.service';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthguardGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router,
        private ls: LsService
    ) {
        //
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.auth.isAuthorized()) {
            return true;
        } else {
            const cu = this.ls.getUserCredential();
            if (cu) {
                return this.auth.login(cu).pipe(
                    map(lr => {
                        return lr?.auth;
                    }),
                    tap(result => {
                        if (!result) {
                            this.router.navigate(['login']);
                        }
                    })
                );
            } else {
                this.router.navigate(['login']);
            }
        }




    }
}
