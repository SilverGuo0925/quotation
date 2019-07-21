import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysMgrService } from '../../services/sys-mgr.service';

export interface Material {

  value: string;
  viewValue: string;

}

export class Quote {

  constructor(public quantity: number, public unitPrice: number, public totalPrice: number, public weight: number) { };

}



@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent implements OnInit {

  //ELEMENT_DATA: PeriodicElement[]=[];
  QUOTE_DATA: Quote[] = [];

  isDivVisible = false;
  displayedColumns: string[] = ['quantity', 'unitPrice', 'totalPrice', 'weight'];
  dataSource;
  options: FormGroup;
  selectedMaterial: string;
  materials: Material[] = [
    { value: 'artPaper', viewValue: 'Art Paper (Most Common)' },
    { value: 'pvc', viewValue: 'PVC (waterproof)' },
    { value: 'transPvc', viewValue: 'Transparent PVC' }
  ]

  costIndex: number = 12.5;//SGD12.5/KG for sticker 
  airIndex: number = 6;//SGD6.0/KG for air shipping fee
  serviceFee: number = 40; //SGD40 for service fee;
  quantity: number = 1000;


  constructor(fb: FormBuilder, private sysMgr: SysMgrService) {
    this.options = fb.group({
      height: ['', [Validators.required, Validators.min(5)]],
      width: ['', [Validators.required, Validators.min(5)]],
      material: ['artPaper'],
      shipping: ['airShipping']
    });
  }


  getWidthSize() {
    return this.options.value.width;
  }

  onSubmit() {

    // air shipping
    if (this.options.invalid) {
      this.isDivVisible = false;
      return;
    }

    this.quantity = 1000;
    //this.ELEMENT_DATA = [];
    this.QUOTE_DATA = [];

    for (var i = 0; i < 10; i++) {

      let areaPerPcsInSM: number = this.options.value.width * this.options.value.height / 10000;
      let weight: number = 3 * areaPerPcsInSM * this.quantity * 100 / 1000;

      let addtionalAirFee: number = (this.options.value.shipping == 'airShipping' ? weight * this.airIndex : 0);
      let totalPriceSGD: number = weight * this.costIndex + weight * this.airIndex + this.serviceFee + addtionalAirFee;
      let unitPriceSGD: number = totalPriceSGD / this.quantity;

      if (this.options.value.material == 'pvc' || this.options.value.material == 'transPvc') {
        unitPriceSGD = unitPriceSGD * 1.5;
        totalPriceSGD = totalPriceSGD * 1.5;
      }

      let quote = new Quote(this.quantity, parseFloat(unitPriceSGD.toFixed(3)), parseFloat(totalPriceSGD.toFixed(2)), parseFloat(weight.toFixed(2)));
      this.QUOTE_DATA.push(quote);


      this.quantity += 1000;
    }


    //sea shipping

    //this.dataSource = this.ELEMENT_DATA;
    this.dataSource = this.QUOTE_DATA;

    if (this.isDivVisible == false) {
      this.isDivVisible = true;
    }


  }

  ngOnInit() {

  }
}
