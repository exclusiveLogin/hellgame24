import { Component, OnInit } from '@angular/core';
import {TopEventsService} from '../services/topevents.service';
import {MenuStateInterface} from '../models/menu-state-interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menuStateUpd: MenuStateInterface = {
    map_upd: false,
    meteo_upd: false,
    news_upd: false,
    settings_upd: false,
    dashboard_upd: false
  };

  constructor(
    private tes: TopEventsService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.tes.getMenuState()
      .subscribe(state => {
        console.log('new state menu : ', state);
        this.menuStateUpd = state;
      });
  }

  public logout(){
    this.auth.logout();
  }
}
