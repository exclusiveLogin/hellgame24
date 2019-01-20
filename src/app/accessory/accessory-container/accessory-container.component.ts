import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../receipt.service';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-accessory-container',
  templateUrl: './accessory-container.component.html',
  styleUrls: ['./accessory-container.component.css']
})
export class AccessoryContainerComponent implements OnInit {

  public toggle = 'crafter';

  constructor(
    private reciept: ReceiptService,
    private ingredient: IngredientService,
  ) { }

  ngOnInit() {

  }

  toggleHeader(event){
    if( event ) this.toggle = event;
  }

}
