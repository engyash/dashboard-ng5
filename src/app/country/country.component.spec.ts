import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { CountryComponent } from './country.component';
import { CountryService } from './../service';

class MockCountryService extends CountryService {
    constructor() {
        super(null);
    }

    testCountries= [
        { name: "Australia", alpha2_code: "AU", alpha3_code: "AUS" },
        { name: "Austria", alpha2_code: "AT", alpha3_code: "AUT" },
        { name: "United States of America", alpha2_code: "US", alpha3_code: "USA" }
    ];

    public search(term): Observable<Array<any>> {
        if (!term)
            term = '';

        term = term.toLowerCase();
        return Observable.of(this.testCountries.filter(function (c) { return c.name.toLowerCase().indexOf(term) != -1 || c.alpha2_code.toLowerCase().indexOf(term) != -1 || c.alpha3_code.toLowerCase().indexOf(term) != -1; }));
    }

    public getDetails(countryCode): Observable<any> {        
        return Observable.of(this.testCountries.filter(function (c) { return c.alpha3_code === countryCode })[0]);
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

  it('by default should load list of all countries', () => {
      expect(component.countries.length).toEqual(3);
  });

  describe('search countries', function () {
      it('should search countries by name', () => {
          component.search("aus");
          fixture.detectChanges();
          expect(component.countries.length).toEqual(2);
      });

      it('should search countries by ISO code', () => {
          component.search("USA");
          fixture.detectChanges();
          expect(component.countries.length).toEqual(1);
      });
  });

  describe('get country details', function () {
      it('should get country details by alpha3 code', () => {
          var country: any = { name: "Austria", alpha2_code: "AT", alpha3_code: "AUT" };
          component.getDetails(country);
          fixture.detectChanges();
          expect(country.details).toBeDefined();
          expect(country.details.name).toEqual('Austria');
      });

      it('should expand the country details if already callapsed', () => {
          var country: any = { name: "Austria", alpha2_code: "AT", alpha3_code: "AUT" };
          component.getDetails(country);
          fixture.detectChanges();
          expect(country.isExpand).toBeTruthy();
      });

      it('should collapse the country details if already expanded', () => {
          var country: any = { name: "Austria", alpha2_code: "AT", alpha3_code: "AUT", isExpand: true };
          component.getDetails(country);
          fixture.detectChanges();
          expect(country.isExpand).toBeFalsy();
      });
  });
});
