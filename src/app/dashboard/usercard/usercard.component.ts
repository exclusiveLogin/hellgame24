import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../models/user-interface';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {
  @Input() _user: IUser;
  @Input() _owner = false;
  public user: IUser;
  constructor(
    
  ) { }

  ngOnInit() {
    this.user = this._user;


  }

}
