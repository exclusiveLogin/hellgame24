import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IIngredient, IngredientService } from '../../ingredient.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-accessory-wiki',
  templateUrl: './accessory-wiki.component.html',
  styleUrls: ['./accessory-wiki.component.css']
})
export class AccessoryWikiComponent implements OnInit {

  @Input() target: string;
  @Input() inCrafter = false;
  public item: IIngredient;
  public canShown = false;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() inlab: EventEmitter<void> = new EventEmitter();

  constructor(
    private api: ApiService,
    private ingredient: IngredientService,
  ) { }

  ngOnInit() {
    if (this.target) {
      this.ingredient.getIngredientById( this.target ).subscribe(ingredientFromApi => this.item = ingredientFromApi);
      this.canShown = true;
    }
  }

  public closeMe() {
    this.close.emit();
  }

  public goInLab() {
    this.inlab.emit();
  }

  public getItemImage() {
    return this.item && this.item.image_big && this.api.getWikiImagePath() + this.item.image_big;
  }

}
