import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Path } from '../../models/path';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.css']
})
export class MessangerComponent implements OnInit {

  @Input() private mode: string = 'simple';
  @Input() private path: Path = {
    segment: null,
    script: null,
  };
  public debug = false;

  constructor(private state: StateService) { }

  ngOnInit() {
    this.debug = this.state.getState().debug;
  }

}
