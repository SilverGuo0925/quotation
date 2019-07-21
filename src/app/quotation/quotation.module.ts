import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationRoutingModule } from './quotation-routing.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app.material.module';


import { StickerComponent } from './sticker/sticker.component';
import { LabelComponent } from './label/label.component';

@NgModule({
  declarations: [QuotationComponent,StickerComponent,LabelComponent],
  imports: [
    CommonModule,
    QuotationRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class QuotationModule { }
