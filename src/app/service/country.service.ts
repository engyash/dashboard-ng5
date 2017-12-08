﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


// api gateway
import { ApiGateway } from './api-gateway.constant';

@Injectable()
export class CountryService {
    
    constructor(private http: Http) {
        
	}


    // search country
    search(term) {
        return this.http.get(ApiGateway.country + `/search?text=${term}`)
            .map((res: Response) => {
                return res.json().RestResponse.result;
            });
    }

    // get country details by country code
    getDetails(countryCode) {
        return this.http.get(ApiGateway.country + `/get/iso3code/${countryCode}`)
            .map((res: Response) => {
                return res.json().RestResponse.result;
            });
    }



}