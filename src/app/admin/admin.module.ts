import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClrDatepickerModule ,ClarityModule } from '@clr/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomersComponent } from './customers/customers.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


@NgModule({
  declarations: [AdminComponent,AddcustomerComponent,CustomersComponent, CustomerDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ClarityModule,
    ClrDatepickerModule ,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class AdminModule { }
