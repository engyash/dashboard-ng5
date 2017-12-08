import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { CountryService } from './country.service';

describe('CountryService', () => {
    let backend: MockBackend;
    let service: CountryService;


    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
                const responseOptions = new ResponseOptions(options);
                const response = new Response(responseOptions);
                connection.mockRespond(response);
        });
    }

    beforeEach(async(() => {
    TestBed.configureTestingModule({
        providers: [
            BaseRequestOptions,
            MockBackend,
            CountryService,
            {
                deps: [
                    MockBackend,
                    BaseRequestOptions
                ],
                provide: Http,
                useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }
            }
        ]
    });

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(CountryService);

    }));

  it('should be created', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));

  describe('search countries', function () {
      it('should return the list of countries from the server on success', () => {
          setupConnections(backend, {
              body: {
                  RestResponse: {
                      result: [
                          { name: "Australia", alpha2_code: "AU", alpha3_code: "AUS" },
                          { name: "Austria", alpha2_code: "AT", alpha3_code: "AUT" },
                          { name: "United States of America", alpha2_code: "US", alpha3_code: "USA" }
                      ]
                  }
              },
              status: 200
          });
          service.search('').subscribe((data: any[]) => {
              expect(data.length).toBe(3);
              expect(data[0].name).toBe('Australia');
              expect(data[1].name).toBe('Austria');
              expect(data[2].name).toBe('United States of America');
          });
      });

      it('should log an error to the console on error', () => {
          setupConnections(backend, {
              body: { error: `Sorry, failed to search countries.` },
              status: 500
          });
          spyOn(console, 'error');

          service.search('').subscribe(null, () => {
              expect(console.error).toHaveBeenCalledWith(`Sorry, failed to search countries.`);
          });
      });
  });

  describe('get country details', function () {
      it('should return the country details from the server on success', () => {
          setupConnections(backend, {
              body: {
                  RestResponse: {
                      result:
                      { name: "United States of America", alpha2_code: "US", alpha3_code: "USA" }
                  }
              },
              status: 200
          });
          service.getDetails('USA').subscribe((data: any) => {
              expect(data).toBeDefined();
              expect(data.name).toBe('United States of America');
              expect(data.alpha2_code).toBe('US');
              expect(data.alpha3_code).toBe('USA');
          });
      });

      it('should log an error to the console on error', () => {
          setupConnections(backend, {
              body: { error: `Sorry, failed to get country details.` },
              status: 500
          });
          spyOn(console, 'error');

          service.getDetails('').subscribe(null, () => {
              expect(console.error).toHaveBeenCalledWith(`Sorry, failed to get country details.`);
          });
      });
  });
});
