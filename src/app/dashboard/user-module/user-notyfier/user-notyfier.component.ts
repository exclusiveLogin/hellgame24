import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-user-notyfier',
  templateUrl: './user-notyfier.component.html',
  styleUrls: ['./user-notyfier.component.css']
})
export class UserNotyfierComponent implements OnInit {

  constructor(
    private global: GlobalService,
  ) { }

  ngOnInit() {
  }


  public setGlobalStatus(code: string): void{
    let msg = "";
    switch(code){
      case 'red':
        msg = prompt("Причина установки Красного кода");
        this.global.setGlobalStatus('red', msg).subscribe();
        break;
      case 'orange':
        msg = prompt("Причина установки Оранжевого кода");
        this.global.setGlobalStatus('orange', msg).subscribe();
        break;
      case 'green':
        this.global.setGlobalStatus('green').subscribe();
        break;
    }
  };
}
