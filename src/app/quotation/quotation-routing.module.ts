import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuotationComponent} from './quotation/quotation.component';
import { StickerComponent } from './sticker/sticker.component';
import { LabelComponent } from './label/label.component';
import {PlasticbagComponent} from './plasticbag/plasticbag.component';
import {PaperbagComponent} from './paperbag/paperbag.component';
const quotationRoutes: Routes = [
  {
    path: '',
    component: QuotationComponent,
    children: [
      {
        path: 'sticker',
        component: StickerComponent
       
      },
      {
        path: 'plasticbag',
        component: PlasticbagComponent
      },
      {
        path: 'paperbag',
        component: PaperbagComponent
      },
      {
        path: 'label',
        component: LabelComponent
      },
       { path: '', redirectTo: '/quotation/plasticbag', pathMatch: 'full' }

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
