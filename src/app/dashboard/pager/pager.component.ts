import {Component, ContentChild, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input() type: string;
  @Input() offset: string;
  constructor() { }

  ngOnInit() {
  }

}
