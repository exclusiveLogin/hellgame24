import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { IGlobalState } from '../models/global-state-interface';

@Component({
  selector: 'app-system-code',
  templateUrl: './system-code.component.html',
  styleUrls: ['./system-code.component.css'],
})
export class SystemCodeComponent implements OnInit, OnChanges {
  @Input() private _global: IGlobalState = null;

  @HostBinding('class.hide') private hide: boolean;
  @HostBinding('style.backgroundColor') private color: string;
  public system_text = '';
  constructor() { }

  ngOnInit() {
    this.calculate(this._global);
    console.log('devss system:', this);
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes && changes['_global']) {
      this.calculate(changes['_global'].currentValue);
    }

  }
  private calculate(type: IGlobalState): void {
    if (!type) { return; }
    switch ( type.global_code ) {
      case 'red':
        this.color = '#dd3333';
        this.system_text = `${this._global.login ? 'Пользователем ' + this._global.login : ' '} Введен красный уровень опасности ${this._global.message ? ' С сообщением: ' + this._global.message : ''}`;
        this.hide = false;
        break;
      case 'orange':
        this.color = '#dd9933';
        this.system_text = `${this._global.login ? 'Пользователем ' + this._global.login : ' '} Введен оранжевый уровень опасности. ${this._global.message ? ' С сообщением: ' + this._global.message : ''}`;
        this.hide = false;
        break;
      case 'night':
        this.color = '#222';
        this.system_text = `Системой введен уровень опасности НОЧЬ`;
        this.hide = false;
        break;
      case 'gold_m':
        this.color = 'orange';
        this.system_text = `Утренний золотой час`;
        this.hide = false;
        break;
      case 'gold_e':
        this.color = 'orange';
        this.system_text = `Вечерний золотой час`;
        this.hide = false;
        break;
      case 'blue_m':
        this.color = 'blue';
        this.system_text = `Утренний синий час`;
        this.hide = false;
        break;
      case 'blue_e':
        this.color = 'blue';
        this.system_text = `Вечерний синий час`;
        this.hide = false;
        break;
      default:
        this.color = '#555';
        this.system_text = ``;
        this.hide = true;
    }
  }
}
