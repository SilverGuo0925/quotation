import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickerComponent } from './sticker/sticker.component';
import { LabelComponent } from './label/label.component';

const routes: Routes = [
  { path: '', redirectTo: '/sticker', pathMatch: 'full' },
  { path: 'sticker', component: StickerComponent },
  { path: 'label', component: LabelComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash:true}) ],
  exports: [ RouterModule ]

})

export class AppRoutingModule { }
