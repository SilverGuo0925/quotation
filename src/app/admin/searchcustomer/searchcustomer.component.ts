import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { SysMgrService } from 'app/services/sys-mgr.service';
import { Customer } from 'app/models/customer';

@Component({
  selector: 'app-searchcustomer',
  templateUrl: './searchcustomer.component.html',
  styleUrls: ['./searchcustomer.component.scss']
})
export class SearchcustomerComponent implements OnInit {


  cnt:number;
  customers:Customer[];
  error:any;
  constructor(private sysMgr: SysMgrService) { }

  ngOnInit() {
    this.sysMgr.getCustomers().subscribe(
      customers=> this.customers=customers, // success path
      error => this.error = error // error path
    );
this.cnt=this.customers.length;
    
  }

  
}
