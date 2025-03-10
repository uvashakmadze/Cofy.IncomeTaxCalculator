export interface IncomeTaxCalculateResponse {
    grossAnnualSalary: number;
    grossMonthlySalary: number;
    netAnnualSalary: number;
    netMonthlySalary: number;
    annualTaxPaid: number;
    monthlyTaxPaid: number;
    incomeTaxPercent: number;
  }