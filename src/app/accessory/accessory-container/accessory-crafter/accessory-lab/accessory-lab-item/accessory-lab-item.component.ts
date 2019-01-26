import { Component, OnInit, Input } from '@angular/core';
import { IngredientService, IIngredient } from '../../../../ingredient.service';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../../../../api.service';

@Component({
  selector: 'app-accessory-lab-item',
  templateUrl: './accessory-lab-item.component.html',
  styleUrls: ['./accessory-lab-item.component.css']
})
export class AccessoryLabItemComponent implements OnInit {

  @Input() private itemID;
  public targetItem: IIngredient;
  constructor(
    private ingredient: IngredientService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    if( this.itemID )
    this.ingredient.getIngredientById( this.itemID )
    .pipe(filter<IIngredient>(it => !!it))
    .subscribe((i) => {
      console.log('ingredient in item:',i.id, i);
      this.targetItem = i;
    });
  }

  public getItemIcon(){
    return this.targetItem && this.targetItem.image_min ? this.api.getIconPath('ingredient') +this.targetItem.image_min : this.api.getIconPath('ingredient') + 'no_icon.png'
  }

}
