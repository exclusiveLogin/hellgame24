import {Component, ContentChild, Input, OnInit} from '@angular/core';
import { IUser } from '../../models/user-interface';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input() type: string;
  @Input() offset: string;

  public currentUser: IUser;

  constructor( private ui: UiService) { }

  ngOnInit() {
    this.ui.getCurrentUserChangeEvent().subscribe((c_user: IUser) => {
      console.log('current user changed: ', c_user);
      this.currentUser = c_user;
    });
  }

}
