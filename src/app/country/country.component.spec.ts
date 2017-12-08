import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { CountryComponent } from './country.component';
import { CountryService } from './../service';

class MockCountryService extends CountryService {
    Country: any ;

    constructor() {
        super(null);
    }

    testCountries= [
        { name: "Australia", alpha2_code: "AU", alpha3_code: "AUS" },
        { name: "Austria", alpha2_code: "AT", alpha3_code: "AUT" },
        { Name: "United States of America", alpha2_code: "US", alpha3_code: "USA" }
    ];

    public search(term): Observable<Array<any>> {
        return Observable.of(this.testCountries);
    }

    public getDetails(country): Observable<any> {
        return Observable.of(this.testCountries[0]);
    }
}


describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [CountryComponent],
        imports: [FormsModule],
        providers: [{ provide: CountryService, useClass: MockCountryService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
