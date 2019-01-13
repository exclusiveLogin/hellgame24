import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessoryContainerComponent } from './accessory-container/accessory-container.component';
import { AccessoryItemComponent } from './accessory-container/accessory-item/accessory-item.component';
import { AccessoryHeaderComponent } from './accessory-container/accessory-header/accessory-header.component';
import { AccessoryCrafterComponent } from './accessory-container/accessory-crafter/accessory-crafter.component';
import { AccessoryInventoryComponent } from './accessory-container/accessory-inventory/accessory-inventory.component';
import { AccessoryWikiComponent } from './accessory-container/accessory-wiki/accessory-wiki.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AccessoryHeaderComponent,
    AccessoryCrafterComponent,
    AccessoryInventoryComponent,
    AccessoryContainerComponent,
    AccessoryItemComponent,
    AccessoryWikiComponent
  ],
  exports: [
    AccessoryContainerComponent
  ]
})
export class AccessoryModule { }
