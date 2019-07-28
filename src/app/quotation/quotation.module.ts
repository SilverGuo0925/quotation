import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationRoutingModule } from './quotation-routing.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


import { StickerComponent } from './sticker/sticker.component';
import { LabelComponent } from './label/label.component';
import { PlasticbagComponent } from './plasticbag/plasticbag.component';
import { PaperbagComponent } from './paperbag/paperbag.component';

@NgModule({
  declarations: [QuotationComponent,StickerComponent,LabelComponent, PlasticbagComponent, PaperbagComponent],
  imports: [
    CommonModule,
    QuotationRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class QuotationModule { }
