import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../auth.service';
import { UserServiceService } from '../../user-service.service';
import { TopEventsService } from '../../topevents.service';
import { UxEventerService } from '../../ux-eventer.service';

export interface IStatusBtn {
  icon: string,
  title: string,
  class?: string,
}

export interface IUserStatus{
  mode?:string,
  id?: string,
  status: string,
  login: string,
  title?: string,
  class?: string,
  datetime_create?: string,
}

let STATUS_BUTTONS: IStatusBtn[] = [
  { icon: 'fas fa-home', title: 'Дома' },
  { icon: 'fas fa-building', title: 'Работаю' },
  { icon: 'fas fa-eye', title: 'Мониторинг' },
  { icon: 'fas fa-smile', title: 'Радуюсь' },
  { icon: 'fas fa-tired', title: 'Грущу' },
  { icon: 'fas fa-car', title: 'В машине' },
  { icon: 'fas fa-taxi', title: 'В такси' },
  { icon: 'fas fa-code', title: 'В разработке' },
  { icon: 'fas fa-battery-empty', title: 'Батарея разряжена' },
  { icon: 'fas fa-battery-half', title: 'Батарея в норме' },
  { icon: 'fas fa-battery-full', title: 'Батарея заряжена' },
  { icon: 'fas fa-bolt', title: 'Гроза' },
  { icon: 'fas fa-cloud', title: 'Облачносто' },
  { icon: 'fas fa-cloud-sun', title: 'Переменная облачность' },
  { icon: 'fas fa-cloud-meatball', title: 'Снег' },
  { icon: 'fas fa-cloud-showers-heavy', title: 'Ливень' },
];

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {

  constructor(
    private ui: UiService,
    private auth: AuthService,
    private user: UserServiceService,
    private tes: TopEventsService,
    private uxevent: UxEventerService,
  ) { }

  ngOnInit() {

  }

  public confirm( b: IStatusBtn ){
    confirm("Устанавливаем статус : " + b.title + ' ?');
    // отправляем статус
    let login = this.auth.authorizedAs();
    this.user.setUserStatus( b, login );
    this.close();
    this.tes.refreshSegment('status');
    this.uxevent.setUserStatus( login, b.title );
  }

  public get buttons(){
    return STATUS_BUTTONS;
  }

  public close(){
    this.ui.closeUserStatus();
  }

}
