import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usercardled',
  templateUrl: './usercardled.component.html',
  styleUrls: ['./usercardled.component.css']
})
export class UsercardledComponent implements OnInit {


  @Input() online: boolean;

  constructor() { }

  ngOnInit() {
  }

}
