import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user-interface';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from '../services/ui.service';
import { TopEventsService } from '../services/topevents.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(
    private users: UserServiceService,
    private router: ActivatedRoute,
    private ui: UiService,
    private tes: TopEventsService,
    private auth: AuthService,
  ) { }

  public v_users: IUser[] = [];
  public cur_user: IUser;

  private userChangeSub: Subscription;
  private userStatusChangeSub: Subscription;
  private routerSub: Subscription;
  private routerParamsSub: Subscription;

  ngOnInit() {

    this.users.getUsersInit()
      .subscribe((users: IUser[]) => {
        console.log('users:', users);
        this.v_users = users;

        // если переход по URL
        if( this.router.snapshot.params['user'] ) {
          this.cur_user = users.find(u => u.login === this.router.snapshot.params['user']);
          if( this.cur_user ) this.ui.setCurrentUserSelect( this.cur_user );
        } else {
          this.cur_user = users.find( u => u.login === this.auth.authorizedAs() );
          if( (this.cur_user && this.cur_user.login) ) {
            this.ui.setCurrentUserSelect( this.cur_user );
          }
        }
      });

    this.userStatusChangeSub = this.tes.getSegmentRefreshSignal('status')
      .pipe( switchMap( ()=> this.users.refreshUsers()) )
      .subscribe( users => this.v_users = users);

    this.userChangeSub = this.ui.getCurrentUserChangeEvent()
      .subscribe(user => {
        if( user ){
          this.cur_user = user;
          console.log('devss user changed on:', user.login);
        }
      });
    }

  public isUserOwner(user: IUser): boolean{
    return user.login === this.auth.authorizedAs();
  }

  public selectUser( user: IUser ){
    this.ui.setCurrentUserSelect(user);
  }

  public forMe( user: IUser ): boolean{
    return this.auth.authorizedAs() === (user && user.login);
  }

}
