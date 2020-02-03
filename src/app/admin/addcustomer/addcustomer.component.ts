import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysMgrService } from '../../services/sys-mgr.service';
import {Customer} from '../../models/customer';
import {first} from 'rxjs/operators';

// export class Customer {

//   constructor(public contactPerson: string, public companyName: string, public phone: number, public email: string, public address: string, public postcode : number, public buidingFloorUnit : string) { };

// }

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.scss']
})
export class AddcustomerComponent implements OnInit {

  isHidden: boolean;
   error: string;
   res:string;
  // customer: Customer;
  options:FormGroup;
  constructor(fb: FormBuilder, private sysMgr: SysMgrService) {
    this.options = fb.group({
      contactPerson: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      email: ['', [Validators.email]],
      customerId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postcode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
      buidingFloorUnit: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit() {

    // air shipping
    if (this.options.invalid) {
      return;
    }

    this.isHidden=false;
    this.res=undefined;
    this.error=undefined;

    let customer = new Customer(
    this.options.value.contactPerson,
    this.options.value.companyName,
    this.options.value.phone,
    this.options.value.email,
    this.options.value.customerId,
    this.options.value.address,
    this.options.value.postcode,
    this.options.value.buidingFloorUnit)

      this.sysMgr.saveNewCustomer(customer)
      .pipe(first())
      .subscribe(
        data =>{
          this.isHidden=true;
          this.res="Customer has been created successfully";
        },
          error => {
              this.error = error // error path
          });

  }
}
