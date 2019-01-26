import { Component, OnInit, Input } from '@angular/core';
import { IngredientService } from '../../../ingredient.service';

@Component({
  selector: 'app-accessory-lab',
  templateUrl: './accessory-lab.component.html',
  styleUrls: ['./accessory-lab.component.css']
})
export class AccessoryLabComponent implements OnInit {


  @Input() public targetId;


  constructor(
    private ingredient: IngredientService
  ) { }

  ngOnInit() {
    console.log('lab init:', this.targetId);
  }

}
