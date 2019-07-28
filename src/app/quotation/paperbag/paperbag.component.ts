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
  selector: 'app-paperbag',
  templateUrl: './paperbag.component.html',
  styleUrls: ['./paperbag.component.scss'],
  host: { 'class': 'content-area' }
})
export class PaperbagComponent implements OnInit {


  //ELEMENT_DATA: PeriodicElement[]=[];
  QUOTE_DATA: Quote[] = [];

  isDivVisible = false;
  displayedColumns: string[] = ['quantity', 'unitPrice', 'totalPrice', 'weight'];
  dataSource;
  options: FormGroup;
  bagTypes: Material[] = [
    { value: 'singlet', viewValue: 'Singlet Plastic Bag' },
    { value: 'diecut', viewValue: 'Die Cut Bag' },
    { value: 'softloop', viewValue: 'Soft Loop Bag' }
  ]
  areaPerPcsInSM: number;
  totalPriceSGD: number;
  unitPriceSGD: number;

  costIndex: number = 6.4;//SGD6.4/KG for sticker 
  airIndex: number = 6;//SGD6.0/KG for air shipping fee
  serviceFee: number = 50; //SGD50 for service fee;
  quantity: number = 5000;


  constructor(fb: FormBuilder, private sysMgr: SysMgrService) {
    this.options = fb.group({
      height: ['', [Validators.required, Validators.min(1)]],
      width: ['', [Validators.required, Validators.min(1)]],
      sideWidth: [''],
      thickness: [''],
      bagType: ['singlet']
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

    this.quantity = 5000;
    //this.ELEMENT_DATA = [];
    this.QUOTE_DATA = [];

    for (var i = 0; i < 3; i++) {

      if (!this.options.value.sideWidth)
        this.areaPerPcsInSM = this.options.value.width * this.options.value.height / 10000;
      else
        this.areaPerPcsInSM = this.options.value.height * (this.options.value.width + this.options.value.sideWidth) / 10000;

      let volumePerPcsInCM: number = this.areaPerPcsInSM * this.options.value.thickness / 100000
      let weight: number = (volumePerPcsInCM * this.quantity) * 1000;

      if (this.options.value.bagType == 'softloop') {
        this.totalPriceSGD = weight * this.costIndex * 1.5 + this.serviceFee
        this.unitPriceSGD = this.totalPriceSGD / this.quantity;
      }
      else {

        this.totalPriceSGD = weight * this.costIndex + this.serviceFee
        this.unitPriceSGD = this.totalPriceSGD / this.quantity;
      }
      let quote = new Quote(this.quantity, parseFloat(this.unitPriceSGD.toFixed(3)), parseFloat(this.totalPriceSGD.toFixed(2)), parseFloat(weight.toFixed(2)));
      this.QUOTE_DATA.push(quote);


      if (i == 0)
        this.quantity = 10000;
      else
        this.quantity = 20000;
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
