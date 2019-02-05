import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { IngredientService } from '../../../ingredient.service';
import { ISlot } from '../../accessory-inventory/accessory-inventory.component';
import { InventoryService } from '../../../inventory.service';
import { AuthService } from '../../../../auth.service';
import { ReceiptService, IRecieptPartData } from '../../../receipt.service';

@Component({
  selector: 'app-accessory-lab',
  templateUrl: './accessory-lab.component.html',
  styleUrls: ['./accessory-lab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessoryLabComponent implements OnInit {
  private e_slot: boolean = false;
  private e_parts: {idSlot: string, flag: boolean}[] = [];

  @Input() public targetId;
  @Output() public close = new EventEmitter();

  public emptySlot: ISlot;
  public receiptParts: IRecieptPartData[];

  constructor(
    private receipt: ReceiptService,
    private ingredient: IngredientService,
    private inventory: InventoryService,
    private auth: AuthService,
    private ds: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.inventory.getEmptySlotByUser( this.auth.authorizedAs()).subscribe(sl => this.emptySlot = sl);

    this.receipt.getRecieptParts( this.targetId )
      .subscribe( (recParts: IRecieptPartData[]) => {
        this.receiptParts = recParts;

        this.e_parts = recParts.map(i => { return{idSlot: i.require_ingredient, flag: false} })
        this.ds.markForCheck();
      });
  }

  public emptySlotEstablished(flag: boolean){
    this.e_slot = flag;
    this.ds.markForCheck();
  }

  public e_partEstablished( flag: boolean, index: number ){
    Promise.resolve().then(()=>this.e_parts[index].flag = flag);
    setTimeout(()=>this.ds.markForCheck(), 500);
  }

  public canCraft(): boolean{
    return this.e_slot && this.e_parts.every(p => !!p.flag);
  }

  public craftThisItem(){
    if(confirm('Создать?'))
      this.inventory.clearCache();
      this.inventory.craftNewInventoryItem( this.targetId, this.emptySlot.id, this.receiptParts );
    this.close.emit();
  }
}
