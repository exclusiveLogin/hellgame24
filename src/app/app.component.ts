import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}
  public hidemenu = false;
  @HostListener('document:scroll')
  private winScroll(): void {
    this.hidemenu = (document.documentElement.scrollTop > 50);
  }

  public ngOnInit(): void {
    //this.auth.login({login: 'ssv', password: 'ddd'});
  }
}
