import { Component, OnInit } from '@angular/core';
import { IIngredient, IngredientService, IRGO } from '../../ingredient.service';
import { InventoryService } from '../../inventory.service';
import { ISlot } from '../accessory-inventory/accessory-inventory.component';
import { AuthService } from '../../../auth.service';
import { IAccessoryItemOptions } from '../accessory-item/accessory-item.component';

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
  public empty_nonowner_slots: ISlot[] = [];
  public unlinked_rgos: IRGO[] = [];

  constructor(
    private ingredientService: IngredientService,
    private inventoryService: InventoryService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    console.log('demo', this);
    this.ingredientService.getAllIngredients().subscribe(items => this.lib_items = items);
    this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
    this.inventoryService.getNonOwnerEmptySlots().subscribe(items => this.empty_nonowner_slots = items);
    this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.non_empty_slots = items);
    this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.empty_slots = items);
    this.ingredientService.getAllUnlinkedRGO().subscribe(items => this.unlinked_rgos = items);

    this.loged_as = this.auth.authorizedAs();
  }

  public loged_as: string = 'no login';

  public lib_item_options: IAccessoryItemOptions = {
    addtionalBtns:[
      {
        key: 'spawn',
        title:'Создать ингредиент',
        onClick: (item) => {
          console.log('spawn onClick item: ', item);
          this.inventoryService.spawnNewItem( item.id ).subscribe(r => {
            console.log(r);
            this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
          });
        },
        class: 'btn_warning'
      }
    ]
  }

  public rgo_on_map_options: IAccessoryItemOptions = {
    addtionalBtns:[
      {
        key: 'grind',
        title:'Подобрать ингредиент',
        onClick: (item: ISlot) => {
          console.log('grind onClick item: ', item)
          this.inventoryService.grindItemInSlot( item.id ).subscribe(r => {
            this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
            this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.non_empty_slots = items);
          });
        },
      },
      {
        key: 'util',
        title:'Утилизировать ингредиент',
        onClick: (item: ISlot) => {
          console.log('util rgo onClick item: ', item);
          this.inventoryService.utilizationInventoryItem( item.rgo_id ).subscribe(r => {
            this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
            this.inventoryService.getNonOwnerEmptySlots().subscribe(items => this.empty_nonowner_slots = items);
          });
        },
        class: 'btn_danger'
      }
    ]
  }

  public slots_options: IAccessoryItemOptions = {
    addtionalBtns:[
      {
        key: 'drop',
        title:'Выбросить ингредиент',
        onClick: (item: ISlot) => {
          console.log('drop onClick item: ', item);
          this.inventoryService.dropItemFromInventory( item.id ).subscribe(r => {
            this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.non_empty_slots = items);
            this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
          })
        },
        class: 'btn_warning'
      },
      {
        key: 'util',
        title:'Утилизировать ингредиент',
        onClick: (item: ISlot) => {
          console.log('util onClick item: ', item);
          this.inventoryService.utilizationInventoryItem( item.rgo_id ).subscribe(r => {
            this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.non_empty_slots = items);
            this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.empty_slots = items);
          })
        },
        class: 'btn_danger'
      }
    ]
  }

  public e_slots_options: IAccessoryItemOptions = {
    addtionalBtns:[
      {
        key: 'remove',
        title:'Уничтожить слот',
        onClick: (item: string) => {
          console.log('remove slot onClick item: ', item);
          this.inventoryService.removeSlot( item ).subscribe(r => {
            this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.empty_slots = items);
          });
        },
        class: 'btn_danger'
      }
    ]
  }

  public e_nonowner_slots_options: IAccessoryItemOptions = {
    addtionalBtns:[
      {
        key: 'remove',
        title:'Уничтожить слот',
        onClick: (item: ISlot) => {
          console.log('remove slot onClick item: ', item);
          this.inventoryService.removeSlot( item.id ).subscribe(r => {
            this.inventoryService.getNonOwnerEmptySlots().subscribe(items => this.empty_nonowner_slots = items);
          });
        },
        class: 'btn_danger'
      }
    ]
  }

  public unlinked_rgos_options: IAccessoryItemOptions = {
    addtionalBtns:[
      {
        key: 'wrap',
        title:'Обернуть в слот',
        onClick: (item: IRGO) => {
          console.log('wrap in slot onClick item: ', item);
          this.inventoryService.wrapRGOInSlot( item.id ).subscribe( r =>{
            this.ingredientService.getAllUnlinkedRGO().subscribe(items => this.unlinked_rgos = items);
            this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
          })
        },
      },
      {
        key: 'util',
        title:'Утилизировать обьект без слота',
        onClick: (item: IRGO) => {
          console.log('util rgo onClick item: ', item);
          this.inventoryService.utilizationRGO( item.id ).subscribe(r => {
            this.ingredientService.getAllUnlinkedRGO().subscribe(items => this.unlinked_rgos = items);
          });
        },
        class: 'btn_danger'
      }
    ]
  }

  public createNewSlot(){
    this.inventoryService.creatNewSlotByUser()
      .subscribe((result: ISlot) => {
        this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.empty_slots = items);
      })
  }
}
