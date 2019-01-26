import { Component, OnInit, Input } from '@angular/core';
import { IngredientService } from '../../../ingredient.service';
import { ISlot } from '../../accessory-inventory/accessory-inventory.component';
import { InventoryService } from '../../../inventory.service';
import { AuthService } from '../../../../auth.service';
import { ReceiptService, IRecieptPartData } from '../../../receipt.service';

@Component({
  selector: 'app-accessory-lab',
  templateUrl: './accessory-lab.component.html',
  styleUrls: ['./accessory-lab.component.css']
})
export class AccessoryLabComponent implements OnInit {

  @Input() public targetId;
  public emptySlot: ISlot;
  public receiptParts: IRecieptPartData[];

  constructor(
    private receipt: ReceiptService,
    private ingredient: IngredientService,
    private inventory: InventoryService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    console.log('lab init:', this.targetId);
    this.inventory.getEmptySlotByUser( this.auth.authorizedAs()).subscribe(sl => this.emptySlot = sl);

    this.receipt.getRecieptParts( this.targetId )
      .subscribe( (recParts: IRecieptPartData[]) => this.receiptParts = recParts);
  }

}
