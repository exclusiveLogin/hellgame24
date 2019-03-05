import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-user-emo',
  templateUrl: './user-emo.component.html',
  styleUrls: ['./user-emo.component.css']
})
export class UserEmoComponent implements OnInit {

  @Input() oldEmo: number;

  constructor( private ui: UiService ) { }

  ngOnInit() {
  }
  public sliderValue = this.oldEmo || 5;
  public sliderOptions: Options = {
    floor: 0,
    ceil: 10,
    showTicks: true,
  }

  public close(){
    this.ui.closeEmoStatus();
  }

  public submitEmo(){
    
  }
}
