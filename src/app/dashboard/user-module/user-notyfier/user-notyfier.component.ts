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
    switch(code){
      case 'red':
        this.global.setGlobalStatus('red').subscribe(global => {
          this.global.updateGlobalState(global);
        });
        break;
      case 'orange':
        this.global.setGlobalStatus('orange').subscribe(global => {
          this.global.updateGlobalState(global);
        });
        break;
      case 'green':
        this.global.setGlobalStatus('green').subscribe(global => {
          this.global.updateGlobalState(global);
        });
        break;
    }
  };
}
