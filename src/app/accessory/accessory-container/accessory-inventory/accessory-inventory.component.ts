import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../models/user-interface';
import { AuthService } from '../../../auth.service';
import { InventoryService } from '../../inventory.service';

export interface ISlot{
  id: string,
  owner: string,
  rgo_id: string,
  type: string,
  go_id: string,
  newslotId?: string,
  spawn?:string,
}

@Component({
  selector: 'app-accessory-inventory',
  templateUrl: './accessory-inventory.component.html',
  styleUrls: ['./accessory-inventory.component.css']
})
export class AccessoryInventoryComponent implements OnInit {

  public slots: ISlot[];
  public showWiki: boolean = false;
  public currentItemId: string;

  constructor(
    private auth: AuthService,
    private inventory: InventoryService,

  ) { }

  ngOnInit() {
    let user: string = this.auth.authorizedAs();

    if(user) this.inventory.getAllSlotsByUser( user )
      .subscribe(( userSlots )=> this.slots = userSlots.sort((usp, usn) => !usn.rgo_id ? -1 : 0));
  }


  public closeWiki(){
    this.showWiki = false;
  }

  public openWiki( item: ISlot ){
    this.showWiki = false;
    this.currentItemId = item.go_id;
    if ( item.go_id ) setTimeout(()=>this.showWiki = true, 250);
  }
}
