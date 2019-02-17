import { Component, OnInit, Input } from '@angular/core';
import { IAccessoryItemOptions, IAdditionalButtons } from '../accessory-item/accessory-item.component';

@Component({
  selector: 'app-accessory-spawn',
  templateUrl: './accessory-spawn.component.html',
  styleUrls: ['./accessory-spawn.component.css']
})
export class AccessorySpawnComponent implements OnInit {
  @Input() options: IAccessoryItemOptions;

  constructor() { }

  ngOnInit() {

  }

  public clickAdditionalBtn(ab: IAdditionalButtons) {
    if (ab.onClick) ab.onClick();
  }

}
