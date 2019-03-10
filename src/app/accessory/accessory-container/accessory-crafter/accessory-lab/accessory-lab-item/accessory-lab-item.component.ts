import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IngredientService, IIngredient } from '../../../../ingredient.service';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../../../../services/api.service';
import { InventoryService } from '../../../../inventory.service';
import { AuthService } from '../../../../../services/auth.service';
import { ISlot } from '../../../accessory-inventory/accessory-inventory.component';
import { browser } from 'protractor';

@Component({
  selector: 'app-accessory-lab-item',
  templateUrl: './accessory-lab-item.component.html',
  styleUrls: ['./accessory-lab-item.component.css']
})
export class AccessoryLabItemComponent implements OnInit {

  @Input() public itemID;
  @Input() public reqNum;
  @Output() public ready: EventEmitter<boolean> = new EventEmitter();

  public targetItem: IIngredient;
  public inStock: number  = 0;

  constructor(
    private ingredient: IngredientService,
    private api: ApiService,
    private inventory: InventoryService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    if( this.itemID ){
        this.ingredient.getIngredientById( this.itemID )
        .pipe(filter<IIngredient>(it => !!it))
        .subscribe((i) => {
          this.targetItem = i;

          this.getCountOfItemOfUser(this.targetItem.id)
        });
    }else{
      this.ready.emit(true);
    }
  }

  public getItemIcon(){
    return this.targetItem && this.targetItem.image_min ? this.api.getIconPath('ingredient') +this.targetItem.image_min : this.api.getIconPath('ingredient') + 'no_icon.png'
  }

  private getCountOfItemOfUser(id: string){
    this.inventory.getIngredientsOfUser(this.auth.authorizedAs(), id)
      .subscribe( (ingredients: ISlot[]) => {
        this.inStock = ingredients ? ingredients.length : 0;
        this.recalc();
    });
  }

  private recalc(){
    if( this.inStock >= this.reqNum ) this.ready.emit( true );
    else this.ready.emit( false );
  }

}
