import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { UiService } from '../../../services/ui.service';
import { AuthService } from '../../../auth.service';
import { UserServiceService } from '../../../user-service.service';
import { UxEventerService } from '../../../ux-eventer.service';

@Component({
  selector: 'app-user-emo',
  templateUrl: './user-emo.component.html',
  styleUrls: ['./user-emo.component.css']
})
export class UserEmoComponent implements OnInit {

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
