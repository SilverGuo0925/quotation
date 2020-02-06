import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { SysMgrService } from 'app/services/sys-mgr.service';
import { Customer } from 'app/models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  isDgHidden:boolean;
  cnt:number;
  customers:Customer[];
  error:any;
  constructor(private sysMgr: SysMgrService) { }

  ngOnInit() {
    this.sysMgr.getCustomers().subscribe(
      customers=> this.customers=customers, // success path
      error => this.error = error // error path
    );
    
  }
  onEdit(customer:Customer){
  this.isDgHidden=true;
  }
  
}
