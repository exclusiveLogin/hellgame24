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
    if (!type) return;
    if (type.global_code === 'red') {
      this.color = '#dd3333';
      this.system_text = `${this._global.login ? "Пользователем "+this._global.login : ' '} Введен красный уровень опасности ${this._global.message ? " С сообщением: "+this._global.message : ''}`;
      this.hide = false;
    } else if (type.global_code === 'orange') {
      this.color = '#dd9933';
      this.system_text = `${this._global.login ? "Пользователем "+this._global.login : ' '} Введен оранжевый уровень опасности. ${this._global.message ? " С сообщением: "+this._global.message : ''}`;
      this.hide = false;
    } else {
      this.color = '#555';
      this.system_text = ``;
      this.hide = true;
    }
  }
}
