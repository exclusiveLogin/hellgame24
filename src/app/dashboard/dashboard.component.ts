import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {IUser} from '../models/user-interface';
import { AuthService } from '../auth.service';
import { UiService } from '../services/ui.service';
import { Route, ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private users: UserServiceService,
    private auth: AuthService,
    private ui: UiService,
    private router: ActivatedRoute,
    private r: Router
    ) { }
  public v_users: IUser[] = [];
  public cur_user: IUser;
  private routerSub;
  private routerParamsSub;

  ngOnInit() {
    this.users.getUsersInit()
      .subscribe((users: IUser[]) => {
        console.log('users:', users);
        this.v_users = users;

        if( this.router.snapshot.params['user'] ) {
          this.cur_user = users.find(u => u.login === this.router.snapshot.params['user']);
          if( this.cur_user ) this.ui.setCurrentUserSelect( this.cur_user );
        } else{
          this.cur_user = users.find(u => u.login === this.auth.authorizedAs());
          if( this.cur_user ) this.ui.setCurrentUserSelect( this.cur_user );
        }
      });
    this.ui.getCurrentUserChangeEvent().subscribe(user => this.cur_user = user);
  }

  public isUserOwner(user: IUser): boolean{
    return user.login === this.auth.authorizedAs();
  }

  public selectUser( user: IUser ){
    this.ui.setCurrentUserSelect(user);
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if( this.routerSub ) this.routerSub.unsubscribe();
    if( this.routerParamsSub ) this.routerParamsSub.unsubscribe();
    console.log('dashboard DESTROY');
  }
}
