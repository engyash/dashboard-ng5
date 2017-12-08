import { Component, OnInit } from '@angular/core';

import { CountryService } from './../service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
    countries: any = [];

    constructor(private countryService: CountryService) {
        this.search('U');
        this.getDetails('USA');
      
    }

    search(term) {
        this.countryService.search(term).subscribe((res) => {
            console.log('res', res);
            this.countries = res;
        }, () => {

        });
    }

    getDetails(countryCode) {
        this.countryService.getDetails(countryCode).subscribe((res) => {
            console.log('country details:', res);
        }, () => {

        });
    }
}
