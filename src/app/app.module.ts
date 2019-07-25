import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { ClarityModule } from '@clr/angular';
import {QuotationModule} from './quotation/quotation.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { TrackComponent } from './track/track.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ClarityModule,
    QuotationModule 
  ],
  declarations: [AppComponent, TopNavComponent, LoginComponent, PageNotFoundComponent, DocumentationComponent, TrackComponent, HomeComponent],
  //entryComponents: [DialogContentComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
