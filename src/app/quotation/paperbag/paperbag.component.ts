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

export class Specs {

  constructor(public size: string, public bagType: string, public width: number, public sideWidth: number, public height: number, public thickness: number ) { };

  public toString(): string {

    let specs: string = "";

    if (!this.sideWidth)
      specs = specs + this.width + "x" + this.height + "cm,";
    else
      specs = specs + this.width + "+" + this.sideWidth +  "x" + this.height + "cm,";

    specs = specs + this.thickness + "gsm";
    return specs;
  }

}

export class Data {

  constructor(public size: string,public specs: string, public qty500Price: number, public qty1kPrice: number, public qty2kPrice: number) { };

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
  displayedColumnsCS: string[] = ['bagSpecs', '500pcs', '1Kpcs', '2Kpcs'];
  
  dsVertical;
  dsHorizontal;
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
    this.isDivVisible = false;
  }
  ngOnInit() {
    this.calcVerticalData();
    this.calcHorizontalData();
  }

  calcQuote(bagSpecs: Specs): Data {

    data:Data;
    let arQuote: Quote[] = [];

    for (var i = 0; i < 3; i++) {

      let unfoldHeight: number = bagSpecs.height + 4 + 2 + bagSpecs.sideWidth / 2;
      let unfoldWidth: number = 2 + 2 * (bagSpecs.width + bagSpecs.sideWidth);

      this.areaPerPcsInSM = unfoldWidth * unfoldHeight / 10000;

      // let volumePerPcsInCM: number = this.areaPerPcsInSM *  / 100000
      let weight: number = (this.areaPerPcsInSM * this.quantity[i]) * bagSpecs.thickness / 1000;

     
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
      

      let quote = new Quote(this.quantity[i], parseFloat(this.unitPriceSGD.toFixed(3)), parseFloat(this.totalPriceSGD.toFixed(0)), parseFloat(weight.toFixed(0)));
      arQuote.push(quote);


    }

   let data =new Data( bagSpecs.size, bagSpecs.toString(),arQuote[0].totalPrice,arQuote[1].totalPrice,arQuote[2].totalPrice);
    return data;
  }

  calcVerticalData() {
  
    spec :Specs;
    data:Data;
   let  arData:Data[]=[];
    let arSpecs: Specs[] = [];
   
    arSpecs.push(new Specs('Small 1','singlet',13,6,19,250));
    arSpecs.push(new Specs('Small 2','singlet',15,6,22,250));
    arSpecs.push(new Specs('Medium 1','singlet',20,9,25,250));
    arSpecs.push(new Specs('Medium 2','singlet',22,10,27,250));
    arSpecs.push(new Specs('Medium 3','singlet',21,8,30,250));
    arSpecs.push(new Specs('Medium 4','singlet',26,8,30,250));
    arSpecs.push(new Specs('Large 1','singlet',27,10,32,250));
    arSpecs.push(new Specs('Large 2','singlet',26,10,35,250));
    arSpecs.push(new Specs('Large 1','singlet',30,10,40,250));
    arSpecs.push(new Specs('Large 2','singlet',32,11,44,250));

    for (var i = 0; i < arSpecs.length; i++) {
     let spec = arSpecs[i];
     let data =this.calcQuote(spec);
     arData.push(data);
    }
    this.dsVertical=arData;
  }
  calcHorizontalData() {
  
    spec :Specs;
    data:Data;
   let  arData:Data[]=[];
    let arSpecs: Specs[] = [];
   
    arSpecs.push(new Specs('Small 1','singlet',12,6,10,250));
    arSpecs.push(new Specs('Small 2','singlet',15,6,12,250));
    arSpecs.push(new Specs('Medium 1','singlet',19,6,13,250));
    arSpecs.push(new Specs('Medium 2','singlet',24,10,17,250));
    arSpecs.push(new Specs('Medium 3','singlet',29,9,18,250));
    arSpecs.push(new Specs('Medium 4','singlet',30,13,25,250));
    arSpecs.push(new Specs('Large 1','singlet',35,10,10,250));
    arSpecs.push(new Specs('Large 2','singlet',40,10,30,250));
    arSpecs.push(new Specs('Large 1','singlet',43,14,32,250));


    for (var i = 0; i < arSpecs.length; i++) {
     let spec = arSpecs[i];
     let data =this.calcQuote(spec);
     arData.push(data);
    }
    this.dsHorizontal=arData;
  }

}
