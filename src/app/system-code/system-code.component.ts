import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-system-code',
  templateUrl: './system-code.component.html',
  styleUrls: ['./system-code.component.css'],
})
export class SystemCodeComponent implements OnInit, OnChanges {
  @Input() private _type = 'none';
  @HostBinding('class.hide') private hide: boolean;
  @HostBinding('style.backgroundColor') private color: string;
  public system_text = '';
  constructor() { }

  ngOnInit() {
    this.calculate(this._type);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['_type']) {
      this.calculate(changes['_type'].currentValue);
    }
    console.log('changes:', changes);
  }
  private calculate(type: string): void {
    if (type === 'red') {
      this.color = '#dd3333';
      this.system_text = 'Введен красный уровень опасности';
      this.hide = false;
    } else if (type === 'orange') {
      this.color = '#dd9933';
      this.system_text = 'Введен оранжевый уровень опасности';
      this.hide = false;
    } else {
      this.color = '#555';
      this.system_text = '';
      this.hide = true;
    }
  }
}
