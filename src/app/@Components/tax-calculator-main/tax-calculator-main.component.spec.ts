import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCalculatorMainComponent } from './tax-calculator-main.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../@core/Services/api.service';

describe('TaxCalculatorMainComponent', () => {
  let component: TaxCalculatorMainComponent;
  let fixture: ComponentFixture<TaxCalculatorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxCalculatorMainComponent, HttpClientModule],
      providers: [ApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxCalculatorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
