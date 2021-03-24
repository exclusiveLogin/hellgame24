import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public submitEnter(login: string, password: string): void {
    console.log('попытка входа с login: ', login, ' password: ', password);
    this.auth.login({ login, password }).subscribe(() => this.router.navigate(['/']));
  }
}
