import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { CountryService } from './service';

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent
  ],
  imports: [
    AppRoutingModule,
    HttpModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
