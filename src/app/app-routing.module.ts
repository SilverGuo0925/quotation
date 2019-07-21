import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  // { path: '', redirectTo: '/sticker', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'quotation',
    loadChildren: () => import('./quotation/quotation.module').then(mod => mod.QuotationModule)
  },
  { path: '**', component: PageNotFoundComponent }

];


@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { }
