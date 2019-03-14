import { Component, OnInit } from '@angular/core';
import { IIngredient, IngredientService, IRGO } from '../../ingredient.service';
import { InventoryService } from '../../inventory.service';
import { ISlot } from '../accessory-inventory/accessory-inventory.component';
import { AuthService } from '../../../services/auth.service';
import { IAccessoryItemOptions } from '../accessory-item/accessory-item.component';
import { SpawnerService, ISpawn } from '../../spawner.service';
import { LockerService } from '../../locker.service';
import { combineLatest, Observable } from 'rxjs';
import { TopEventsService } from '../../../services/topevents.service';

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
  public spawns: ISpawn[] = [];

  constructor(
    private ingredientService: IngredientService,
    private inventoryService: InventoryService,
    private auth: AuthService,
    private spawn: SpawnerService,
    private locker: LockerService,
    private tes: TopEventsService,
  ) { }

  ngOnInit() {
    console.log('demo', this);
    this.refreshComponent();

    this.tes.getSegmentRefreshSignal('accessory').subscribe( state => this.refreshComponent())

    this.loged_as = this.auth.authorizedAs();
    this.locker.getLockSegment('demo').subscribe( state => this.locked = state);
  }

  private refreshComponent(){
    console.log('REFRESHING DEMO');
    this.ingredientService.getAllIngredients().subscribe(items => this.lib_items = items);
    this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
    this.inventoryService.getNonOwnerEmptySlots().subscribe(items => this.empty_nonowner_slots = items);
    this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.non_empty_slots = items);
    this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.empty_slots = items);
    this.ingredientService.getAllUnlinkedRGO().subscribe(items => this.unlinked_rgos = items);
    this.spawn.getAllSpawn().subscribe(spawns => this.spawns = spawns);
  }

  public locked: boolean = false;
  public loged_as: string = 'no login';

  public lib_item_options: IAccessoryItemOptions = {
    addtionalBtns:[
      {
        key: 'spawn',
        title:'Создать ингредиент',
        onClick: (item) => {
          this.locker.lockingSegment('demo');
          this.inventoryService.spawnNewItem( item.id ).subscribe(r => {
            this.inventoryService.getNonOwnerSlots().subscribe(items => this.rgo_on_map = items);
            this.locker.unlockingSegment('demo');
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
          this.locker.lockingSegment('demo');
          this.inventoryService.grindItemInSlot( item.id ).subscribe(r => {
            combineLatest(
              this.inventoryService.getNonOwnerSlots(),
              this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs())
              ).subscribe(([nos, nes])=>{
                this.rgo_on_map = nos;
                this.non_empty_slots = nes;
                this.locker.unlockingSegment('demo');
              });
          });
        },
      },
      {
        key: 'util',
        title:'Утилизировать ингредиент',
        onClick: (item: ISlot) => {
          console.log('util rgo onClick item: ', item);
          this.locker.lockingSegment('demo');
          this.inventoryService.utilizationInventoryItem( item.rgo_id ).subscribe(r => {
            combineLatest(
              this.inventoryService.getNonOwnerSlots(),
              this.inventoryService.getNonOwnerEmptySlots()
              ).subscribe(([nos, enos])=>{
                this.rgo_on_map = nos;
                this.empty_nonowner_slots = enos;
                this.locker.unlockingSegment('demo');
              });
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
          this.locker.lockingSegment('demo');
          this.inventoryService.dropItemFromInventory( item.id ).subscribe(r => {

            combineLatest(
              this.inventoryService.getNonOwnerSlots(),
              this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs())
              ).subscribe(([nos, nes])=>{
                this.rgo_on_map = nos;
                this.non_empty_slots = nes;
                this.locker.unlockingSegment('demo');
              });

          })
        },
        class: 'btn_warning'
      },
      {
        key: 'util',
        title:'Утилизировать ингредиент',
        onClick: (item: ISlot) => {
          console.log('util onClick item: ', item);
          this.locker.lockingSegment('demo');
          this.inventoryService.utilizationInventoryItem( item.rgo_id ).subscribe(r => {

            combineLatest(
              this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs()),
              this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs())
              ).subscribe(([nes, es])=>{
                this.non_empty_slots = nes;
                this.empty_slots = es;
                this.locker.unlockingSegment('demo');
              });

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
          this.locker.lockingSegment('demo');
          this.inventoryService.removeSlot( item ).subscribe(r => {
            this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs()).subscribe(items => this.empty_slots = items);
            this.locker.unlockingSegment('demo');
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
          this.locker.lockingSegment('demo');
          this.inventoryService.removeSlot( item.id ).subscribe(r => {
            this.inventoryService.getNonOwnerEmptySlots().subscribe(items => this.empty_nonowner_slots = items);
            this.locker.unlockingSegment('demo');
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
          this.locker.lockingSegment('demo');
          this.inventoryService.wrapRGOInSlot( item.id ).subscribe( r =>{

            combineLatest(
              this.ingredientService.getAllUnlinkedRGO(),
              this.inventoryService.getNonOwnerSlots()
              ).subscribe(([aurgo, nos])=>{
                this.unlinked_rgos = aurgo;
                this.rgo_on_map = nos;
                this.locker.unlockingSegment('demo');
              });

          })
        },
      },
      {
        key: 'util',
        title:'Утилизировать обьект без слота',
        onClick: (item: IRGO) => {
          console.log('util rgo onClick item: ', item);
          this.locker.lockingSegment('demo');
          this.inventoryService.utilizationRGO( item.id ).subscribe(r => {
            this.ingredientService.getAllUnlinkedRGO().subscribe(items => this.unlinked_rgos = items);
            this.locker.unlockingSegment('demo');
          });
        },
        class: 'btn_danger'
      }
    ]
  }

  public spawn_options: IAccessoryItemOptions = {
    addtionalBtns:[
      {
        key: 'spawn',
        title:'Породить объект в спауне',
        onClick: ( spawn: ISpawn ) => {
          console.log('spawn onClick');
          this.locker.lockingSegment('demo');
          this.spawn.spawnObjectByID( spawn.id ).subscribe((res)=>{
            this.spawn.getAllSpawn().subscribe(spawns => this.spawns = spawns);
            this.locker.unlockingSegment('demo');
          });
        },
        class: 'btn_danger',
        if: ( spawn: ISpawn ) => !spawn.armed_slot_id,
      },
      {
        key: 'grind_from_spawn',
        title:'Получить предмет из спауна',
        onClick: ( spawn: ISpawn ) => {
          console.log('grind onClick');
          this.locker.lockingSegment('demo');
          this.inventoryService.grindItemFromSpawn( spawn.armed_slot_id, spawn.id ).subscribe((res)=>{

            combineLatest(
              this.spawn.getAllSpawn(),
              this.inventoryService.getNonEmptySlotsByUser(this.auth.authorizedAs())
              ).subscribe(([ass, nos])=>{
                this.spawns = ass;
                this.non_empty_slots = nos;
                this.locker.unlockingSegment('demo');
              });

          })
        },
        if: ( spawn: ISpawn ) => !!spawn.armed_slot_id,
      }
    ]
  }


  public createNewSlot(){
    this.locker.lockingSegment('demo');
    this.inventoryService.creatNewSlotByUser()
      .subscribe((result: ISlot) => {
        this.inventoryService.getEmptySlotsByUser(this.auth.authorizedAs())
          .subscribe(items => {
            this.empty_slots = items;
            this.locker.unlockingSegment('demo');
          });
      })
  }
}
