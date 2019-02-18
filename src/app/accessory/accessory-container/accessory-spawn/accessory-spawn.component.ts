import { Component, OnInit, Input } from '@angular/core';
import { IAccessoryItemOptions, IAdditionalButtons } from '../accessory-item/accessory-item.component';
import { ISpawn, SpawnerService } from '../../spawner.service';
import { ISlot } from '../accessory-inventory/accessory-inventory.component';
import { InventoryService } from '../../inventory.service';

@Component({
  selector: 'app-accessory-spawn',
  templateUrl: './accessory-spawn.component.html',
  styleUrls: ['./accessory-spawn.component.css']
})
export class AccessorySpawnComponent implements OnInit {
  @Input() options: IAccessoryItemOptions;
  @Input() spawnID: string;

  public spawn: ISpawn;
  public armedSlot: ISlot;

  constructor(
    private spawnService: SpawnerService,
    private inventory: InventoryService,
  ) { }

  ngOnInit() {
    if(this.spawnID) {
      this.spawnService.getSpawnerById( this.spawnID ).subscribe(s => {
        this.spawn = s;
        this.checkArmedSlot();
      });
    }
  }

  private checkArmedSlot(){
    this.spawn && this.spawn.armed_slot_id && this.inventory.getSlotById( this.spawn.armed_slot_id )
      .subscribe(slot => this.armedSlot = slot);
  }

  public clickAdditionalBtn(ab: IAdditionalButtons) {
    if (ab.onClick) ab.onClick( this.spawn || this.spawnID );
  }

}
