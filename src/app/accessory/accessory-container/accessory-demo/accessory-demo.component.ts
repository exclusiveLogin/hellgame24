import { Component, OnInit } from '@angular/core';
import { IIngredient, IngredientService } from '../../ingredient.service';
import { InventoryService } from '../../inventory.service';
import { ISlot } from '../accessory-inventory/accessory-inventory.component';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-accessory-demo',
  templateUrl: './accessory-demo.component.html',
  styleUrls: ['./accessory-demo.component.css']
})
export class AccessoryDemoComponent implements OnInit {

  public rgo_on_map: ISlot[] = [];
  public lib_items: IIngredient[] = [];
  public non_empty_slots: ISlot[] = [];
  public empty_slots: ISlot[] = [];
  constructor(
    private ingredientService: IngredientService,
    private inventoryService: InventoryService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    console.log('demo', this);
    this.ingredientService.getAllIngredients().subscribe(items => this.lib_items = items);
    this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
    this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.non_empty_slots = items);
    this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.empty_slots = items);
  }

}
