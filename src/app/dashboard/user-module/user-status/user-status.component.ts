import { Component, OnInit, HostBinding } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { AuthService } from '../../../services/auth.service';
import { UserServiceService } from '../../../services/user-service.service';
import { TopEventsService } from '../../../services/topevents.service';
import { UxEventerService } from '../../../services/ux-eventer.service';
import { enterLeaveAnimationDefault } from '../../../models/enterLeaveAnimation';

export interface IStatusBtn {
  icon: string;
  title: string;
  class?: string;
}

export interface IUserStatus {
  mode?: string;
  id?: string;
  status: string;
  login: string;
  title?: string;
  class?: string;
  datetime_create?: string;
}

const STATUS_BUTTONS_ACT: IStatusBtn[] = [
  { icon: 'fas fa-home', title: 'Дома' },
  { icon: 'fas fa-building', title: 'Работаю' },
  { icon: 'fas fa-eye', title: 'Мониторинг' },
  { icon: 'fas fa-car', title: 'В машине' },
  { icon: 'fas fa-taxi', title: 'В такси' },
  { icon: 'fas fa-code', title: 'В разработке' },
  { icon: 'fas fa-tree', title: 'На природе' },
  { icon: 'fas fa-baby-carriage', title: 'С ребенком' },
  { icon: 'fas fa-birthday-cake', title: 'Праздную' },
  { icon: 'fas fa-book-reader', title: 'Изучаю' },
  { icon: 'fas fa-broadcast-tower', title: 'На частоте' },
  { icon: 'fas fa-bullhorn', title: 'Вещаю' },
  { icon: 'fas fa-bug', title: 'В отладке' },
  { icon: 'fas fa-camera', title: 'На съемке' },
  { icon: 'fas fa-cart-plus', title: 'Покупки' },
  { icon: 'fas fa-church', title: 'В церкви' },
  { icon: 'fas fa-city', title: 'На улице' },
  { icon: 'fas fa-coffee', title: 'Кофебрейк' },
  { icon: 'fas fa-cogs', title: 'Крафт' },
  { icon: 'fas fa-glass-cheers', title: 'Свидание' },
  { icon: 'fas fa-guitar', title: 'Музицирую' },

];

const STATUS_BUTTONS_STATE: IStatusBtn[] = [
  { icon: 'fas fa-smile', title: 'Радуюсь' },
  { icon: 'fas fa-tired', title: 'Грущу' },
  { icon: 'fas fa-battery-empty', title: 'Батарея разряжена' },
  { icon: 'fas fa-battery-half', title: 'Батарея в норме' },
  { icon: 'fas fa-battery-full', title: 'Батарея заряжена' },
  { icon: 'fas fa-bell', title: 'В ожидании' },
  { icon: 'fas fa-bed', title: 'Сплю' },
  { icon: 'fas fa-capsules', title: 'Болею' },
  { icon: 'fas fa-grin-beam-sweat', title: 'Веселюсь' },
  { icon: 'fas fa-hand-middle-finger', title: 'Да пошли вы'},
  { icon: 'fas fa-allergies', title: 'Аллергия'},
  { icon: 'fas fa-beer', title: 'Не трезв'}

];

const STATUS_BUTTONS_MONITORING: IStatusBtn[] = [
  { icon: 'fas fa-bolt', title: 'Гроза' },
  { icon: 'fas fa-cloud', title: 'Облачно' },
  { icon: 'fas fa-cloud-sun', title: 'Переменная облачность' },
  { icon: 'fas fa-cloud-meatball', title: 'Снег' },
  { icon: 'fas fa-cloud-showers-heavy', title: 'Ливень' },
  { icon: 'fas fa-cloud-moon-rain', title: 'Ночной ливень' },
];


@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css'],
  animations: [ enterLeaveAnimationDefault ]
})
export class UserStatusComponent implements OnInit {

  @HostBinding('@Anima') public myStatusAnima = true;

  constructor(
    private ui: UiService,
    private auth: AuthService,
    private user: UserServiceService,
    private tes: TopEventsService,
    private uxevent: UxEventerService,
  ) { }

  ngOnInit() {

  }

  public confirm( b: IStatusBtn ) {
    if (confirm('Устанавливаем статус : ' + b.title + ' ?')) {
      // отправляем статус
      const user = this.auth.authorizedUser();
      this.user.setUserStatus( b, user.login ).subscribe( () => {
        this.close();
        this.tes.refreshSegment('status');
        this.uxevent.setUserStatus( user, b.title );
      });

    }

  }

  public get buttons_state() {
    return STATUS_BUTTONS_STATE;
  }

  public get buttons_act() {
    return STATUS_BUTTONS_ACT;
  }

  public get buttons_monitoring() {
    return STATUS_BUTTONS_MONITORING;
  }

  public close() {
    this.ui.closeUserStatus();
  }

}
