import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Options } from 'ng5-slider';
import { UiService } from '../../../services/ui.service';
import { AuthService } from '../../../services/auth.service';
import { UserServiceService } from '../../../services/user-service.service';
import { UxEventerService } from '../../../services/ux-eventer.service';
import { enterLeaveAnimationDefault } from '../../../models/enterLeaveAnimation';

@Component({
  selector: 'app-user-emo',
  templateUrl: './user-emo.component.html',
  styleUrls: ['./user-emo.component.css'],
  animations:[ enterLeaveAnimationDefault]
})
export class UserEmoComponent implements OnInit {

  @HostBinding('@Anima') public myStatusAnima = true;
  @Input() oldEmo: number;

  constructor( 
    private ui: UiService,
    private auth: AuthService,
    private user: UserServiceService,
    private uxevent: UxEventerService,
     ) { }
     
  public sliderValue;
  public emo_title = '';

  ngOnInit() {
    this.sliderValue = this.oldEmo || 5;
  }
  
  public sliderOptions: Options = {
    floor: 0,
    ceil: 10,
    showTicks: true,
  }

  public close(){
    this.ui.closeEmoStatus();
  }

  public submitEmo(){
    let login = this.auth.authorizedAs();

    let o = {
      login,
      value: this.sliderValue,
      title: this.emo_title,
    }

    this.user.setUserEmo( o );
    this.close();
    
    this.uxevent.setUserEmo( login, this.sliderValue, this.emo_title);
  }
}
