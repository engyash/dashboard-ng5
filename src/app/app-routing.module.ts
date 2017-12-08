
import {Routes, RouterModule} from '@angular/router';
import { CountryComponent } from './country/country.component';

import {NgModule} from '@angular/core';

const routes: Routes = [  

  {path: '', component: CountryComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
