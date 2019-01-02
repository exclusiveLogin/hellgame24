import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {IUser} from '../models/user-interface';
import { AuthService } from '../auth.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private users: UserServiceService,
    private auth: AuthService,
    private ui: UiService
    ) { }
  public v_users: IUser[] = [];
  public cur_user: IUser;

  ngOnInit() {
    this.users.getUsersInit()
      .subscribe((users: IUser[]) => {
        console.log('users:', users);
        this.v_users = users;
        this.cur_user = users.find(u => u.login === this.auth.authorizedAs());
        if( this.cur_user ) this.ui.setCurrentUserSelect( this.cur_user );
      });
    this.ui.getCurrentUserChangeEvent().subscribe(user => this.cur_user = user);
  }

  public isUserOwner(user: IUser): boolean{
    return user.login === this.auth.authorizedAs();
  }

  public selectUser( user: IUser ){
    this.ui.setCurrentUserSelect(user);
  }
}
