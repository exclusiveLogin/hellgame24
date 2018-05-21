import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {TopeventsService} from './topevents.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private tes: TopeventsService
  ) {}
  public hidemenu = false;
  public hidemenuToggler = false;
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
    // this.auth.login({login: 'ssv', password: 'ddd'});
    if (window && window.matchMedia) {
      window.matchMedia('(max-width: 470px)')
        .addListener((match: MediaQueryList) => {
          this.hidemenuToggler = match.matches;
        });
      this.hidemenuToggler = window.matchMedia('(max-width: 470px)').matches;
    }
  }
}
