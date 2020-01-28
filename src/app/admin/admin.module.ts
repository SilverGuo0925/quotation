import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchcustomerComponent } from './searchcustomer/searchcustomer.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';


@NgModule({
  declarations: [AdminComponent,AddcustomerComponent,SearchcustomerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class AdminModule { }
