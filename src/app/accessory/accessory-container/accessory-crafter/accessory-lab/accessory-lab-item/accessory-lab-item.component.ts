import { Component, OnInit, Input } from '@angular/core';
import { IngredientService, IIngredient } from '../../../../ingredient.service';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../../../../api.service';
import { InventoryService } from '../../../../inventory.service';
import { AuthService } from '../../../../../auth.service';
import { ISlot } from '../../../accessory-inventory/accessory-inventory.component';

@Component({
  selector: 'app-accessory-lab-item',
  templateUrl: './accessory-lab-item.component.html',
  styleUrls: ['./accessory-lab-item.component.css']
})
export class AccessoryLabItemComponent implements OnInit {

  @Input() public itemID;
  @Input() public reqNum;

  public targetItem: IIngredient;
  public inStock: number  = 0;

  constructor(
    private ingredient: IngredientService,
    private api: ApiService,
    private inventory: InventoryService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    if( this.itemID )
    this.ingredient.getIngredientById( this.itemID )
    .pipe(filter<IIngredient>(it => !!it))
    .subscribe((i) => {
      console.log('ingredient in item:',i.id, i);
      this.targetItem = i;

      this.getCountOfItemOfUser(this.targetItem.id)
    });
  }

  public getItemIcon(){
    return this.targetItem && this.targetItem.image_min ? this.api.getIconPath('ingredient') +this.targetItem.image_min : this.api.getIconPath('ingredient') + 'no_icon.png'
  }

  private getCountOfItemOfUser(id: string){
    this.inventory.getIngredientsOfUser(this.auth.authorizedAs(), id)
      .subscribe( (ingredients: ISlot[]) => this.inStock = ingredients ? ingredients.length : 0);
  }

}
