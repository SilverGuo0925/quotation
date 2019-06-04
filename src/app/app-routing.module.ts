import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickerComponent } from './sticker/sticker.component';
import { LabelComponent } from './label/label.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', redirectTo: '/sticker', pathMatch: 'full' },
  { path: 'sticker', component: StickerComponent },
  { path: 'label', component: LabelComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]

})

export class AppRoutingModule { }
