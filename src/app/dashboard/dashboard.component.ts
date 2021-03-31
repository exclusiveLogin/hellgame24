import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import {IUser} from '../models/user-interface';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';
import { Route, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TopEventsService } from '../services/topevents.service';
import {merge, of, Subscription} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private users: UserServiceService,
    private auth: AuthService,
    private ui: UiService,
    private router: ActivatedRoute,
    private r: Router,
    private tes: TopEventsService,
    ) { }

  public cur_user: IUser;

  private routerSub;

  private routerParamsSub;

  public usermail_shown = false;

  public userstatus_shown = false;
  public useremo_shown = false;

  private userChangeSub: Subscription;
  private userMailShownSub: Subscription;
  private userStatusShownSub: Subscription;
  private userEmoShownSub: Subscription;

  private userStatusChangeSub: Subscription;

  userCards$ = this.tes.getSegmentRefreshSignal('status').pipe(
      switchMap(() => this.users.refreshUsers()),
      map(users => users.filter(u => !u.silent || this.isUserOwner(u) || this.auth.adminMode())),
      tap((users: IUser[]) => {
          console.log('users:', users);
          // если переход по URL
          if ( this.router.snapshot.params['user'] ) {
              this.cur_user = users.find(u => u.login === this.router.snapshot.params['user']);
              if ( this.cur_user ) { this.ui.setCurrentUserSelect( this.cur_user ); }
          } else {
              this.cur_user = users.find( u => u.login === this.auth.authorizedAs() );
              if ( this.cur_user && !this.ui.getCurrentUserSelect()) {
                  this.ui.setCurrentUserSelect( this.cur_user );
              }
          }
      }),
  );

  ngOnInit() {
    this.userChangeSub = this.ui.getCurrentUserChangeEvent().subscribe(user => {
      if ( user ) {
        this.cur_user = user;
      console.log('devss user changed on:', user.login);
      }
    });

    this.userMailShownSub = this.ui.getUsermailShownChangeEvent().subscribe( state => {
      this.usermail_shown = state;
    });

    this.userStatusShownSub = this.ui.getUserStatusShownChangeEvent().subscribe( state => {
      this.userstatus_shown = state;
    });

    this.userEmoShownSub = this.ui.getUserEmoShownChangeEvent().subscribe( state => {
      this.useremo_shown = state;
    });

    /*if( !this.routerParamsSub ) this.routerParamsSub = this.router.params.subscribe(params=>{
          console.log('routerParams:', params);
          this.tes.refreshSegment('blog')
    });*/
  }

  public isUserOwner(user: IUser): boolean {
    return user.login === this.auth.authorizedAs();
  }

  public selectUser( user: IUser ) {
    this.ui.setCurrentUserSelect(user);
  }

  public silentUser(): boolean {
      return this.auth.authorizedUser()?.silent;
  }

  public forMe( user: IUser ): boolean {
    return this.auth.authorizedAs() === (user && user.login);
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if ( this.routerSub ) { this.routerSub.unsubscribe(); }
    if ( this.routerParamsSub ) { this.routerParamsSub.unsubscribe(); }
    if ( this.userChangeSub ) { this.userChangeSub.unsubscribe(); }
    if ( this.userMailShownSub ) { this.userMailShownSub.unsubscribe(); }
    if ( this.userStatusShownSub ) { this.userStatusShownSub.unsubscribe(); }
    if ( this.userStatusChangeSub ) { this.userStatusChangeSub.unsubscribe(); }
    if ( this.userEmoShownSub ) { this.userEmoShownSub.unsubscribe(); }
    console.log('dashboard DESTROY');
  }

  public trackByFn( index, item: IUser) {
    return item.login || index;
  }
}
