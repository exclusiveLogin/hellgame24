import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {IUser} from '../models/user-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private users: UserServiceService) { }
  public v_users: IUser[] = [];

  ngOnInit() {
    this.users.getUsersInit()
      .subscribe(users => {
        console.log('users:', users);
        this.v_users = users;
      });
  }

}
