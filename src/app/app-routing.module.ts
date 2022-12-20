import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import {DocumentationComponent} from './documentation/documentation.component';
import {TrackComponent} from './track/track.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'quotation',
   // loadChildren: () => import('./quotation/quotation.module').then(mod => mod.QuotationModule)//,
   // data: { preload: true }
    loadChildren: './quotation/quotation.module#QuotationModule'
  },
  {
    path: 'admin',
   // loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),canActivate: [AuthGuard]
   loadChildren: './admin/admin.module#AdminModule'

  },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'track', component: TrackComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
   imports: [RouterModule.forRoot(routes, { useHash: true })],
  //imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { }
