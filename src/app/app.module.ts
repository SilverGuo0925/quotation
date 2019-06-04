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
import { StickerComponent } from './sticker/sticker.component';
import { LabelComponent } from './label/label.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule 
  ],
  declarations: [AppComponent, TopNavComponent, StickerComponent, LabelComponent, LoginComponent],
  //entryComponents: [DialogContentComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
