import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { CustomersComponent } from './customers/customers.component';
import {CustomerDetailComponent}from './customer-detail/customer-detail.component'
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'addcustomer',
        component: AddcustomerComponent
       
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'customer/:id',
        component: CustomerDetailComponent
      },
      { path: '', redirectTo: '/admin/customers', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
