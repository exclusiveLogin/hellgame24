import { Component, OnInit } from '@angular/core';
import { IIngredient, IngredientService } from '../../ingredient.service';

@Component({
  selector: 'app-accessory-lib',
  templateUrl: './accessory-lib.component.html',
  styleUrls: ['./accessory-lib.component.css']
})
export class AccessoryLibComponent implements OnInit {

  public itemsLib: IIngredient[];
  public currentItemID: string;
  public shownWiki: boolean = false;


  constructor(
    private ingredientService: IngredientService
  ) { }

  ngOnInit() {
    this.ingredientService.getAllIngredients().subscribe(list => this.itemsLib = list);
  }

  public openWiki( item: IIngredient){
    this.shownWiki = false;
    this.currentItemID = item.id;
    setTimeout(()=>this.shownWiki = true, 250);
  }

  public closeWiki(){
    this.shownWiki = false;
  }
}
