import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {TopEventsService} from './services/topevents.service';
import { GlobalService } from './services/global.service';
import { UserServiceService } from './services/user-service.service';
import { first } from 'rxjs/operators';
import { IGlobalState } from './models/global-state-interface';
import { LsService } from './services/ls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private tes: TopEventsService,
    private global: GlobalService,
    private ls: LsService
  ) {}
  public hidemenu = false;
  public hidemenuToggler = false;
  public global_status: IGlobalState = null;
  @HostListener('document:scroll')
  private winScroll(): void {
    // избегаем не нужного перезаписывания и обновления события
    if (this.hidemenuToggler && this.hidemenu !== (document.documentElement.scrollTop > 50)) {
      this.hidemenu = (document.documentElement.scrollTop > 50);
      setTimeout(() => {
        this.tes.setMenuState(this.hidemenu);
      }, 250);
    }
  }

  public ngOnInit(): void {

    // быстрая шина
    this.global.getGlobalState().subscribe((state) => {
      this.global_status = state;
    });

    // медленная меж клиентская шина
    this.tes.getSegmentRefreshSignal('state').subscribe( state => {
      !!state && this.refreshGlobalStatus();
    });

    /*
    setTimeout(() => {
      this.__type = 'orange';
    }, 2000);
    setTimeout(() => {
      this.__type = '';
    }, 5000);
    setTimeout(() => {
      this.tes.setMenuStateUpdates({'dashboard_upd': true});
    }, 5000);
    setTimeout(() => {
      this.tes.setMenuStateUpdates({'meteo_upd': true});
    }, 7000);
    */

    this.refreshGlobalStatus();

    this.tes.getSegmentRefreshSignal('global').subscribe( state => !!state && this.refreshGlobalStatus());
    if (window && window.matchMedia) {
      window.matchMedia('(max-width: 600px)')
        .addListener((match) => {
          this.hidemenuToggler = match.matches;
        });
      this.hidemenuToggler = window.matchMedia('(max-width: 470px)').matches;
    }
  }

  private refreshGlobalStatus(): void {
    this.global.getState().pipe(first()).subscribe((global) => {
      if (global && global.global_code) {
        this.global_status = global;
      }
    }, (e) => console.log('error State: ', global));
  }
}
