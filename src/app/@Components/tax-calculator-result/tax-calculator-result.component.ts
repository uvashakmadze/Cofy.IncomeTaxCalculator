import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IncomeTaxCalculateResponse } from '../../@core/Models/Entities/IncomeTaxCalculateResponse';
import { CurrencyPound } from '../../@core/Pipes/currency-pound-pipe';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-tax-calculator-result',
  imports: 
  [
    CurrencyPound,
    MatLabel
  ],
  standalone: true,
  templateUrl: './tax-calculator-result.component.html',
  styleUrl: './tax-calculator-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxCalculatorResultComponent {
  @Input() incomeTax: IncomeTaxCalculateResponse = {
    annualTaxPaid: 0,
    grossAnnualSalary: 0,
    grossMonthlySalary: 0,
    incomeTaxPercent: 0,
    monthlyTaxPaid: 0,
    netAnnualSalary: 0,
    netMonthlySalary: 0
   };
}
