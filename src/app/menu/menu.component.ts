import { Component, OnInit } from '@angular/core';
import {TopEventsService} from '../topevents.service';
import {MenuStateInterface} from '../models/menu-state-interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
    private router: Router
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

  public toNews(){
    this.router.navigate(['news']);
  }
}
