import { Component, OnInit } from '@angular/core';
import { Customer } from 'app/models/customer';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SysMgrService } from 'app/services/sys-mgr.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  cnt:number;
  customer$:Observable<Customer>;

  constructor(
    private route: ActivatedRoute,
    private sysMgr: SysMgrService,
    private router: Router
  ) { }

  ngOnInit() {
      // this.customer$=this.route.paramMap.pipe(
      //   switchMap((params:ParamMap)=>
      //   this.sysMgr.getCustomer(params.get('id')))
      //   );
      this.customer$=this.sysMgr.getCustomer(this.route.snapshot.paramMap.get("id"));
      this.cnt=5;
  }

  gotoCustomers(customer: Customer) {
    let customerId = customer ? customer.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/admin/customers']);
  }

}
