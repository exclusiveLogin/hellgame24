import { Component, OnInit, Input } from '@angular/core';
import { IngredientService, IIngredient } from '../../ingredient.service';
import { filter, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../api.service';
import { InventoryService } from '../../inventory.service';
import { AuthService } from '../../../auth.service';

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
  @Input() parentItem: any;
  @Input() mode: 'item' | 'slot' = 'item';
  @Input() options: IAccessoryItemOptions;

  constructor(
    private ingredient: IngredientService,
    private inventory: InventoryService,
    private auth: AuthService,
    private api: ApiService,
  ) { }

  ngOnInit() {

    if(this.itemId && this.mode === 'item')
      this.ingredient.getIngredientById( this.itemId )
      .pipe(filter<IIngredient>(it => !!it))
      .subscribe((i) => {
        this.item = i;
      });

    if(this.itemId && this.mode === 'slot')
      this.inventory.getSlotByIdByUser( this.auth.authorizedAs(), this.itemId )
        .pipe(
          filter(slot => !!slot && !!slot.go_id),
          switchMap(slot => this.ingredient.getIngredientById( slot.go_id ))
          )
        .subscribe((i) => {
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
    if(ab.onClick) ab.onClick( this.parentItem || this.item || this.itemId );
  }
}
