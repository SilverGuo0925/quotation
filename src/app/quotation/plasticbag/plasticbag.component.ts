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

  constructor(public bagType: string, public width: number, public sideWidth: number, public height: number, public thickness: number ) { };

  public toString(): string {

    let specs: string = "";

    if (!this.sideWidth)
      specs = specs + this.width + " x " + this.height + "cm,";
    else
      specs = specs + this.width + " + " + this.sideWidth*2 +  " x " + this.height + "cm,";

    specs = specs + this.thickness + "C.";
    return specs;
  }

}

export class Data {

  constructor(public specs: string, public qty5kPrice: number, public qty10kPrice: number, public qty20kPrice: number) { };

}

@Component({
  selector: 'app-plasticbag',
  templateUrl: './plasticbag.component.html',
  styleUrls: ['./plasticbag.component.scss'],
  host: { 'class': 'content-area' }
})
export class PlasticbagComponent implements OnInit {


  //ELEMENT_DATA: PeriodicElement[]=[];
  arQuote: Quote[] = [];

  isDivVisible = false;
  displayedColumns: string[] = ['quantity', 'unitPrice', 'totalPrice', 'weight'];
  displayedColumnsCS: string[] = ['BagSpecs', '5000pcs', '10000pcs', '20000pcs'];

  dataSource;
  dsSinglet;
  options: FormGroup;
  bagTypes: Material[] = [
    { value: 'singlet', viewValue: 'Singlet Bag' },
    { value: 'diecut', viewValue: 'Die Cut Bag' },
    { value: 'softloop', viewValue: 'Tote Bag' }
  ];
  areaPerPcsInSM: number;
  totalPriceSGD: number;
  unitPriceSGD: number;

  costIndex: number = 6.4;//SGD6/KG for sticker 
  airIndex: number = 6;//SGD6.0/KG for air shipping fee
  serviceFee: number = 100; //SGD50 for service fee;
  quantity: number[] = [5000,10000,20000];

  specs: string;


  constructor(fb: FormBuilder, private sysMgr: SysMgrService) {
    this.options = fb.group({
      height: ['', [Validators.required, Validators.min(1)]],
      width: ['', [Validators.required, Validators.min(1)]],
      sideWidth: [''],
      thickness: ['', [Validators.required, Validators.min(3)]],
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

    //specs

    if (this.options.value.bagType == 'singlet')
      this.specs = "Bag Specs: " + "Singlet Bag" + ",";
    else if (this.options.value.bagType == 'diecut')
      this.specs = "Bag Specs: " + "Die Cut Bag" + ",";
    else this.specs = "Bag Specs: " + "Tote Bag" + ",";

    if (!this.options.value.sideWidth)
      this.specs = this.specs + this.options.value.width + " x " + this.options.value.height + " cm,";
    else
      this.specs = this.specs + this.options.value.width + " + " + this.options.value.sideWidth + " + " + this.options.value.sideWidth + " x " + this.options.value.height + " cm,";

    this.specs = this.specs + this.options.value.thickness + " C.";
   
    //this.ELEMENT_DATA = [];
    this.arQuote = [];

    for (var i = 0; i < 3; i++) {

      if (!this.options.value.sideWidth)
        this.areaPerPcsInSM = this.options.value.width * this.options.value.height / 10000;
      else
        this.areaPerPcsInSM = this.options.value.height * (this.options.value.width + this.options.value.sideWidth * 2) / 10000;

      let volumePerPcsInCM: number = this.areaPerPcsInSM * this.options.value.thickness / 100000
      let weight: number = (volumePerPcsInCM * this.quantity[i]) * 1000;

      if (this.options.value.bagType == 'softloop') {
        this.totalPriceSGD = weight * this.costIndex * 1.5 + this.serviceFee
        this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
      }
      else {

        this.totalPriceSGD = weight * this.costIndex + this.serviceFee
        this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
      }
      let quote = new Quote(this.quantity[i], parseFloat(this.unitPriceSGD.toFixed(3)), parseFloat(this.totalPriceSGD.toFixed(0)), parseFloat(weight.toFixed(0)));
      this.arQuote.push(quote);
     
    }


    //sea shipping

    //this.dataSource = this.ELEMENT_DATA;
    this.dataSource = this.arQuote;

    if (this.isDivVisible == false) {
      this.isDivVisible = true;
    }


  }
  onReset() {
    this.options.reset();
  }
  ngOnInit() {
    this.calcData();
  }
  calcQuote(bagSpecs: Specs): Data {

    data:Data;
    let arQuote: Quote[] = [];

    for (var i = 0; i < this.quantity.length; i++) {

      if (!bagSpecs.sideWidth)
        this.areaPerPcsInSM = bagSpecs.width * bagSpecs.height / 10000;
      else
        this.areaPerPcsInSM = bagSpecs.height * (bagSpecs.width + bagSpecs.sideWidth * 2) / 10000;

      let volumePerPcsInCM: number = this.areaPerPcsInSM * bagSpecs.thickness / 100000
      let weight: number = (volumePerPcsInCM * this.quantity[i]) * 1000;

      if (bagSpecs.bagType == 'softloop') {
        this.totalPriceSGD = weight * this.costIndex * 1.5 + this.serviceFee
        this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
      }
      else {

        this.totalPriceSGD = weight * this.costIndex + this.serviceFee
        this.unitPriceSGD = this.totalPriceSGD / this.quantity[i];
      }
      let quote = new Quote(this.quantity[i], parseFloat(this.unitPriceSGD.toFixed(3)), parseFloat(this.totalPriceSGD.toFixed(0)), parseFloat(weight.toFixed(0)));
      arQuote.push(quote);
    }

   let data =new Data(bagSpecs.toString(),arQuote[0].totalPrice,arQuote[1].totalPrice,arQuote[2].totalPrice);
    return data;
  }

  calcData() {
  
    spec :Specs;
    data:Data;
   let  arData:Data[]=[];
    let arSpecs: Specs[] = [];
   
    arSpecs.push(new Specs('singlet',17,4,28,5));
    arSpecs.push(new Specs('singlet',20,5,32,5));
    arSpecs.push(new Specs('singlet',25,5.5,36,5));
    arSpecs.push(new Specs('singlet',25,5.5,42,5));
    arSpecs.push(new Specs('singlet',28,5.5,48,5));
    arSpecs.push(new Specs('singlet',30,6,50,5));
    arSpecs.push(new Specs('singlet',35,7,56,5));
    arSpecs.push(new Specs('singlet',40,8,60,5));

    for (var i = 0; i < arSpecs.length; i++) {
     let spec = arSpecs[i];
     let data =this.calcQuote(spec);
     arData.push(data);
    }
    this.dsSinglet=arData;
  }
}
