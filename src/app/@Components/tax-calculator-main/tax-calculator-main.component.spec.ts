import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCalculatorMainComponent } from './tax-calculator-main.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../@core/Services/api.service';
import { IncomeTaxCalculateResponse } from '../../@core/Models/Entities/IncomeTaxCalculateResponse';
import { of } from 'rxjs';

describe('TaxCalculatorMainComponent', () => {
  let component: TaxCalculatorMainComponent;
  let fixture: ComponentFixture<TaxCalculatorMainComponent>;
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
      imports: [TaxCalculatorMainComponent, HttpClientModule],
      providers: [ApiService, {
        provide: HttpClient,
        useValue: httpClientSpyObj
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxCalculatorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return values when fetchData success', () => {
    httpClientSpy.post.and.returnValue(of(incomeTaxInput));
    let app = fixture.componentInstance;
    app.fetchData(1000);
    setTimeout(() => {
      expect(app.incomeTaxCalculationSignal()).toEqual(incomeTaxInput);
      expect(app.isClicked).toBe(true);
      expect(app.loading).toBe(true);
    },
    3000);

    setTimeout(() => {
      expect(app.loading).toBe(false);
    },
    1000);
  });

  it('should throw error when fetchData error', () => {
    httpClientSpy.post.and.returnValue(of({}));
    
    let app = fixture.componentInstance;
    app.fetchData(0);
    
    setTimeout(() => {
      expect(app.isClicked).toBe(false);
      expect(app.loading).toBe(false);
    },
    3000);
  });

  it('should return false when form invalid', () => {
    let app = fixture.componentInstance;
    app.f['annualGrossSalary'].setValue("incorrect number");
    let form = app.incomeTaxForm;
    
    expect(form.valid).toEqual(false);
  });

  it('should return true when form valid', () => {
    let app = fixture.componentInstance;
    app.f['annualGrossSalary'].setValue("100000");
    let form = app.incomeTaxForm;
    
    expect(form.valid).toEqual(true);
  });
});
