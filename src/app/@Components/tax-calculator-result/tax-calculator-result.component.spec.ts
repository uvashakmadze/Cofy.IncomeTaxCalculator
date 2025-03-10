import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCalculatorResultComponent } from './tax-calculator-result.component';
import { IncomeTaxCalculateResponse } from '../../@core/Models/Entities/IncomeTaxCalculateResponse';
import { By } from '@angular/platform-browser';

describe('TaxCalculatorResultComponent', () => {
  let component: TaxCalculatorResultComponent;
  let fixture: ComponentFixture<TaxCalculatorResultComponent>;

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
      imports: [TaxCalculatorResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxCalculatorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have empty incomeTax value`, () => {
      const app = fixture.componentInstance;
      expect(app.incomeTax).toEqual({
        annualTaxPaid: 0,
        grossAnnualSalary: 0,
        grossMonthlySalary: 0,
        incomeTaxPercent: 0,
        monthlyTaxPaid: 0,
        netAnnualSalary: 0,
        netMonthlySalary: 0
       });
    });

  it(`should have non-empty incomeTax value`, () => {
      const app = fixture.componentInstance;
      fixture.componentRef.setInput('incomeTax', incomeTaxInput);
      fixture.detectChanges();

      expect(app.incomeTax).toEqual(incomeTaxInput);
    });

  it(`should have seven flex boxes and items with titles and values`, () => {
      fixture.componentRef.setInput('incomeTax', incomeTaxInput);
      fixture.detectChanges();

      const flexBoxes = fixture.debugElement.queryAll(By.css(".flex-box"));
      const flexBoxesLength = flexBoxes.length;
      const flexBoxeItems = fixture.debugElement.queryAll(By.css(".flex-item-label"));
      const flexBoxeItemsLength = flexBoxeItems.length;
      const flexBoxeItemValues = fixture.debugElement.queryAll(By.css(".flex-item-value"));
      const flexBoxeItemValuesLength = flexBoxeItemValues.length;
      
      expect(flexBoxesLength).toEqual(7);
      expect(flexBoxeItemsLength).toEqual(7);
      expect(flexBoxeItemValuesLength).toEqual(7);

      expect(flexBoxeItems[0].nativeElement.textContent).toEqual("Gross Annual Salary:");
      expect(flexBoxeItemValues[0].nativeElement.textContent).toEqual("£ 100000.00");
      expect(flexBoxeItems[1].nativeElement.textContent).toEqual("Gross Monthly Salary:");
      expect(flexBoxeItemValues[1].nativeElement.textContent).toEqual("£ 8333.00");
      expect(flexBoxeItems[2].nativeElement.textContent).toEqual("Net Annual Salary:");
      expect(flexBoxeItemValues[2].nativeElement.textContent).toEqual("£ 60000.00");
      expect(flexBoxeItems[3].nativeElement.textContent).toEqual("Net Monthly Salary:");
      expect(flexBoxeItemValues[3].nativeElement.textContent).toEqual("£ 5000.00");
      expect(flexBoxeItems[4].nativeElement.textContent).toEqual("Annual Tax Paid:");
      expect(flexBoxeItemValues[4].nativeElement.textContent).toEqual("£ 400000.00");
      expect(flexBoxeItems[5].nativeElement.textContent).toEqual("Monthly Tax Paid:");
      expect(flexBoxeItemValues[5].nativeElement.textContent).toEqual("£ 3333.33");
      expect(flexBoxeItems[6].nativeElement.textContent).toEqual("Tax Percent:");
      expect(flexBoxeItemValues[6].nativeElement.textContent).toEqual("% 40");
    });
});
