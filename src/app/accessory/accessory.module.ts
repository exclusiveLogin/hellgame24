import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessoryHeaderComponent } from './accessory-header/accessory-header.component';
import { AccessoryScopeListComponent } from './accessory-scope-list/accessory-scope-list.component';
import { AccessoryCrafterComponent } from './accessory-crafter/accessory-crafter.component';
import { AccessoryScopeListItemComponent } from './accessory-scope-list/accessory-scope-list-item/accessory-scope-list-item.component';
import { AccessoryInventoryComponent } from './accessory-inventory/accessory-inventory.component';
import { AccessoryCardComponent } from './accessory-card/accessory-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AccessoryHeaderComponent,
    AccessoryScopeListComponent,
    AccessoryCrafterComponent,
    AccessoryScopeListItemComponent,
    AccessoryInventoryComponent,
    AccessoryCardComponent
  ],
  exports: [
    AccessoryHeaderComponent,
    AccessoryScopeListComponent,
    AccessoryCrafterComponent,
    AccessoryScopeListItemComponent,
    AccessoryInventoryComponent,
    AccessoryCardComponent
  ]
})
export class AccessoryModule { }
