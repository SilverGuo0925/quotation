import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuotationComponent} from './quotation/quotation.component';
import { StickerComponent } from './sticker/sticker.component';
import { LabelComponent } from './label/label.component';

const quotationRoutes: Routes = [
  {
    path: '',
    component: QuotationComponent,
    children: [
      {
        path: 'sticker',
        component: StickerComponent,
       
      },
      {
        path: 'label',
        component: LabelComponent
      },
       { path: '', redirectTo: '/quotation/sticker', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(quotationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuotationRoutingModule { }
