import { Injectable } from '@angular/core';
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
                if (res.ok) {
                    return res.json().RestResponse.result;
                } else {
                    return this.logError(res);
                }
            });
    }

    // get country details by country code
    getDetails(countryCode) {
        return this.http.get(ApiGateway.country + `/get/iso3code/${countryCode}`)
            .map((res: Response) => {
                if (res.ok) {
                    return res.json().RestResponse.result;
                } else {
                    return this.logError(res);
                }
            });
    }


    private logError(error: any) {
        try {
            error = error.json();
            console.error(error.error);
        } catch (e) {
            // ...ignore
            console.error(error);
        }

        return Observable.throw(error);
    }
}