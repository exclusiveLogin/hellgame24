import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { UxEventerService } from '../../../services/ux-eventer.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-notyfier',
  templateUrl: './user-notyfier.component.html',
  styleUrls: ['./user-notyfier.component.css']
})
export class UserNotyfierComponent implements OnInit {

  constructor(
    private global: GlobalService,
    private uxevent: UxEventerService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }


  public setGlobalStatus(code: string): void {
    let msg = '';
    switch (code) {
      case 'red':
        msg = prompt('Причина установки Красного кода');
        this.global.setGlobalStatus('red', msg).subscribe();
        this.uxevent.setRedCode(this.auth.authorizedUser(), msg);
        break;
      case 'orange':
        msg = prompt('Причина установки Оранжевого кода');
        this.global.setGlobalStatus('orange', msg).subscribe();
        this.uxevent.setOrangeCode(this.auth.authorizedUser(), msg);
        break;
      case 'green':
        this.global.setGlobalStatus('green').subscribe();
        this.uxevent.setGreenCode(this.auth.authorizedUser());
        break;
    }
  }
}
