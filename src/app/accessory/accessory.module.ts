import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessoryContainerComponent } from './accessory-container/accessory-container.component';
import { AccessoryItemComponent } from './accessory-container/accessory-item/accessory-item.component';
import { AccessoryHeaderComponent } from './accessory-container/accessory-header/accessory-header.component';
import { AccessoryCrafterComponent } from './accessory-container/accessory-crafter/accessory-crafter.component';
import { AccessoryInventoryComponent } from './accessory-container/accessory-inventory/accessory-inventory.component';
import { AccessoryWikiComponent } from './accessory-container/accessory-wiki/accessory-wiki.component';
import { AccessoryLabComponent } from './accessory-container/accessory-crafter/accessory-lab/accessory-lab.component';
import { AccessoryLabItemComponent } from './accessory-container/accessory-crafter/accessory-lab/accessory-lab-item/accessory-lab-item.component';
import { AccessoryLibComponent } from './accessory-container/accessory-lib/accessory-lib.component';
import { ReceiptService } from './receipt.service';
import { IngredientService } from './ingredient.service';
import { InventoryService } from './inventory.service';
import { AccessoryDemoComponent } from './accessory-container/accessory-demo/accessory-demo.component';
import { AccessorySpawnComponent } from './accessory-container/accessory-spawn/accessory-spawn.component';
import { SpawnerService } from './spawner.service';
import { LockerService } from './locker.service';

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
    AccessoryWikiComponent,
    AccessoryLabComponent,
    AccessoryLabItemComponent,
    AccessoryLibComponent,
    AccessoryDemoComponent,
    AccessorySpawnComponent,
  ],
  exports: [
    AccessoryContainerComponent
  ],
  providers: [
    ReceiptService,
    IngredientService,
    InventoryService,
    SpawnerService,
    LockerService
  ]
})
export class AccessoryModule { }
