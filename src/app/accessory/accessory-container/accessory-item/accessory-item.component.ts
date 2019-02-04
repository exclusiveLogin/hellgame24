import { Component, OnInit, Input } from '@angular/core';
import { IngredientService, IIngredient } from '../../ingredient.service';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../../api.service';

interface IAdditionalButtons{
  key: string,
  title: string,
  onClick:(any?) => void,
  class?: string
}

export interface IAccessoryItemOptions{
  addtionalBtns: IAdditionalButtons[]
}

@Component({
  selector: 'app-accessory-item',
  templateUrl: './accessory-item.component.html',
  styleUrls: ['./accessory-item.component.css']
})
export class AccessoryItemComponent implements OnInit {

  public item: IIngredient;

  @Input() itemId: string;
  @Input() mode: 'item' | 'slot' = 'item';
  @Input() options: IAccessoryItemOptions;

  constructor(
    private ingredient: IngredientService,
    public api: ApiService
  ) { }

  ngOnInit() {

    console.log('item init:', this.itemId);
    if(this.itemId && this.mode === 'item')
      this.ingredient.getIngredientById( this.itemId )
      .pipe(filter<IIngredient>(it => !!it))
      .subscribe((i) => {
        console.log('ingredient in item:',i.id, i);
        this.item = i;
      });
  }

  public getItemIcon(){
    return this.item && this.item.image_min ? this.api.getIconPath('ingredient') +this.item.image_min : this.api.getIconPath('ingredient') + 'no_icon.png'
  }

  public getCategoryIcon(){
    return this.item && this.item.cat_icon ? this.api.getIconPath('ingredient') +this.item.cat_icon : this.api.getIconPath('ingredient') + 'no_icon.png'
  }

  public clickAdditionalBtn(ab: IAdditionalButtons){
    if(ab.onClick) ab.onClick( this.item || this.itemId );
  }
}
