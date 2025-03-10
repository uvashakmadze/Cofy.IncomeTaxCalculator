import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IncomeTaxCalculateResponse } from '../Models/Entities/IncomeTaxCalculateResponse';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['post']);

  let incomeTaxInput: IncomeTaxCalculateResponse = {
    annualTaxPaid: 400000,
    grossAnnualSalary: 100000,
    grossMonthlySalary: 8333,
    incomeTaxPercent: 40,
    monthlyTaxPaid: 3333.33,
    netAnnualSalary: 60000,
    netMonthlySalary: 5000
   }

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [ApiService, {
            provide: HttpClient,
            useValue: httpClientSpyObj
        }]
      }).compileComponents();
      service = TestBed.inject(ApiService);
      httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;      
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Post Method', () => {
    it('Post with success', () => {
      httpClientSpy.post.and.returnValue(of(incomeTaxInput)); 
      service.Post(1000, "/test").subscribe((data) => {
        expect(data).toEqual(incomeTaxInput);
       });
    });
    
    it('Post return an error when the server returns a 400', () => {
      httpClientSpy.post.and.returnValue(of({}));
      service.Post(0, "/test/badrequest").subscribe(
        () => {},
        (error: any) => {
          expect(error).toEqual(error);
        },
        () => {}
      );
    });
  });
});