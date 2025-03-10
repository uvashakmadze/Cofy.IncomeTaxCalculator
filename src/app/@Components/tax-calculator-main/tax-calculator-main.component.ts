import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../@core/Services/api.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaxCalculatorResultComponent } from '../tax-calculator-result/tax-calculator-result.component';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tax-calculator-main',
  imports: [
    FormsModule,
    MatLabel,
    MatFormFieldModule,
    MatProgressSpinner,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    TaxCalculatorResultComponent
  ],
  templateUrl: './tax-calculator-main.component.html',
  styleUrl: './tax-calculator-main.component.scss',
  standalone: true
})

export class TaxCalculatorMainComponent {

  private ResourceUrl: string = "/taxcalculator/calculate"
  incomeTaxCalculationSignal: WritableSignal<any> = signal({
    annualTaxPaid: 0,
    grossAnnualSalary: 0,
    grossMonthlySalary: 0,
    incomeTaxPercent: 0,
    monthlyTaxPaid: 0,
    netAnnualSalary: 0,
    netMonthlySalary: 0
   });

  loading: boolean = false;
  isClicked: boolean = false;
  spinnerMode: ProgressSpinnerMode = 'indeterminate';

  private readonly apiService = inject(ApiService);
  incomeTaxForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    // Define form fields with validation rules
    this.incomeTaxForm = this.fb.group({
      annualGrossSalary: ['',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern("^[0-9]*$")
        ]
      ]});
  }
  
  onSubmit(): void {
    if (this.incomeTaxForm.valid) {
      this.fetchData(this.f['annualGrossSalary'].value);
    }
  }

  get f() { return this.incomeTaxForm.controls; }

  fetchData(annualGrossSalary: number): void{
    this.loading = true;
    this.apiService.Post(annualGrossSalary, this.ResourceUrl)
      .subscribe(value =>
        {
          this.incomeTaxCalculationSignal.set(value);
          this.isClicked = true;
        },
        (error) => { 
          this.loading = false;
          throw new Error(error); // handled by GlobalErrorHandler service
        },
        () => { 
          this.loading = false;
        });
  }
}
