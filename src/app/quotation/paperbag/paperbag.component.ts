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
    { value: 'whitecardboard', viewValue: 'White Cardboard' },
    { value: 'kraft', viewValue: 'Kraft' },
    { value: 'whitekraft', viewValue: 'White Kraft' }
  ]
  areaPerPcsInSM: number;
  totalPriceSGD: number;
  unitPriceSGD: number;

  costIndex: number[] = [15, 10, 7.5, 7, 6.5];//0-25,9/15-15;25-50,7.5/12.5-10;50-100,6/10-7.5;100...7
  whitekraftIndex: number = 1.3;//SGD6.0/KG for air shipping fee
  serviceFee: number = 50; //SGD50 for service fee;
  quantity: number[] = [500, 1000, 2000, 3000, 5000];


  constructor(fb: FormBuilder, private sysMgr: SysMgrService) {
    this.options = fb.group({
      height: ['', [Validators.required, Validators.min(1)]],
      width: ['', [Validators.required, Validators.min(1)]],
      sideWidth: [''],
      thickness: ['', [Validators.required, Validators.min(160)]],
      bagType: ['whitecardboard']
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

    //this.ELEMENT_DATA = [];
    this.QUOTE_DATA = [];

    for (var i = 0; i < this.quantity.length; i++) {

      let unfoldHeight: number = this.options.value.height + 4 + 2 + this.options.value.sideWidth / 2;
      let unfoldWidth: number = 2 + 2 * (this.options.value.width + this.options.value.sideWidth);

      this.areaPerPcsInSM = unfoldWidth * unfoldHeight / 10000;

      // let volumePerPcsInCM: number = this.areaPerPcsInSM *  / 100000
      let weight: number = (this.areaPerPcsInSM * this.quantity[i]) * this.options.value.thickness / 1000;

      if (this.options.value.bagType == 'whitekraft') {
        if (weight <= 25) {
          this.totalPriceSGD = this.whitekraftIndex * weight * this.costIndex[0] + this.serviceFee
          this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
        }
        else {
          if (weight - 50 <= 0) {
            this.totalPriceSGD = this.whitekraftIndex * ((weight - 25) * this.costIndex[1] + 25 * this.costIndex[0]) + this.serviceFee
            this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
          }
          else {
            if (weight - 100 <= 0) {
              this.totalPriceSGD = this.whitekraftIndex * ((weight - 50) * this.costIndex[2] + (50 - 25) * this.costIndex[1] + 25 * this.costIndex[0]) + this.serviceFee
              this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
            }
            else {
              if (weight - 200 <= 0) {
                this.totalPriceSGD = this.whitekraftIndex * ((weight - 100) * this.costIndex[3] + (100 - 50) * this.costIndex[2] + (50 - 25) * this.costIndex[1] + 25 * this.costIndex[0]) + this.serviceFee
                this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
              }
              else {
                //>200kg
                this.totalPriceSGD = this.whitekraftIndex * ((weight - 200) * this.costIndex[4] + (200 - 100) * this.costIndex[3] + (100 - 50) * this.costIndex[2] + (50 - 25) * this.costIndex[1] + 25 * this.costIndex[0]) + this.serviceFee
                this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];

              }
            }
          }
        }
      }
      else {
        if (weight <= 25) {
          this.totalPriceSGD = weight * this.costIndex[0] + this.serviceFee
          this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
        }
        else {
          if (weight - 50 <= 0) {
            this.totalPriceSGD = (weight - 25) * this.costIndex[1] + 25 * this.costIndex[0] + this.serviceFee
            this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
          }
          else {
            if (weight - 100 <= 0) {
              this.totalPriceSGD = (weight - 50) * this.costIndex[2] + (50 - 25) * this.costIndex[1] + 25 * this.costIndex[0] + this.serviceFee
              this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
            }
            else {
              if (weight - 200 <= 0) {
                this.totalPriceSGD = (weight - 100) * this.costIndex[3] + (100 - 50) * this.costIndex[2] + (50 - 25) * this.costIndex[1] + 25 * this.costIndex[0] + this.serviceFee
                this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
              }
              else {
                //>200kg
                this.totalPriceSGD = (weight - 200) * this.costIndex[4] + (200 - 100) * this.costIndex[3] + (100 - 50) * this.costIndex[2] + (50 - 25) * this.costIndex[1] + 25 * this.costIndex[0] + this.serviceFee
                this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];

              }
            }
          }
        }
      }




      let quote = new Quote(this.quantity[i], parseFloat(this.unitPriceSGD.toFixed(3)), parseFloat(this.totalPriceSGD.toFixed(0)), parseFloat(weight.toFixed(0)));
      this.QUOTE_DATA.push(quote);



    }


    //sea shipping

    //this.dataSource = this.ELEMENT_DATA;
    this.dataSource = this.QUOTE_DATA;

    if (this.isDivVisible == false) {
      this.isDivVisible = true;
    }


  }
  onReset() {
    this.options.reset();
  }
  ngOnInit() {

  }


}
