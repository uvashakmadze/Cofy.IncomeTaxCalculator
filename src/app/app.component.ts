import { Component } from '@angular/core';
import { TaxCalculatorMainComponent } from './@Components/tax-calculator-main/tax-calculator-main.component';

@Component({
  selector: 'app-root',
  imports: [
    TaxCalculatorMainComponent
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Income Tax Calculator';
}
