import { Component, OnInit } from '@angular/core';

interface IUser {
  name?: string;
  title?: string;
  status?: string;
  message?: {
    text?: string;
    icon?: string;
    datetime?: string;
  };
}
@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {
  public user: IUser = {
    name: 'SSV',
    title: 'Разработчик',
    status: 'Играет',
    message: {
      text: 'Облачно',
      icon: 'fas fa-cloud',
      datetime: '2 часа назад'
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
