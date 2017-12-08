import { Component, OnInit } from '@angular/core';

import { CountryService } from './../service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
    searchTerm: string = '';
    countries: any = [];

    constructor(private countryService: CountryService) {
        this.search('');
    }


    // search countries by ISO code / Country name
    search(searchTerm) {
        this.countryService.search(searchTerm).subscribe((res) => {
            this.countries = res;
        }, () => {

        });
    }

    // get country details by Country code
    getDetails(country) {
        country.isExpand = !country.isExpand;

        this.countryService.getDetails(country.alpha3_code).subscribe((res) => {
            country.details = res;
        }, () => {

        });
    }
}
