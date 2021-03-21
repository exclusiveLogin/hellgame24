import { Component, OnInit } from '@angular/core';
import { ReceiptService, IRecieptPartData, IRecieptList } from '../../receipt.service';
import { IIngredient } from '../../ingredient.service';

@Component({
  selector: 'app-accessory-crafter',
  templateUrl: './accessory-crafter.component.html',
  styleUrls: ['./accessory-crafter.component.css']
})
export class AccessoryCrafterComponent implements OnInit {

  public reciepts: IRecieptList[] = [];
  public showWiki = false;
  public showLab = false;
  public showRecieptsContainer = true;
  public wikiIngredient: IRecieptList;


  constructor(
    public reciept: ReceiptService,
  ) { }

  ngOnInit() {
    this.reciept.getAllRecieptList().subscribe(r => this.reciepts = r);
  }

  public closeWiki() {
    this.showWiki = false;
    this.wikiIngredient = null;
    this.showRecieptsContainer = true;

    this.closeLab();
  }

  public openWiki( ingredient ) {
    this.showWiki = true;
    this.wikiIngredient = ingredient;
    this.showRecieptsContainer = false;
  }

  public closeLab() {
    this.showLab = false;
  }

  public openLab() {
    this.showLab = true;
  }

  public selectReciept(item: IIngredient) {
    this.openWiki(item);
  }

}
