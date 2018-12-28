import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {IUser} from '../models/user-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private users: UserServiceService,
    private auth: AuthService,
    ) { }
  public v_users: IUser[] = [];

  ngOnInit() {
    this.users.getUsersInit()
      .subscribe((users: IUser[]) => {
        console.log('users:', users);
        this.v_users = users;
      });
  }

  public isUserOwner(user: IUser): boolean{
    return user.login === this.auth.authorizedAs();
  }

}
