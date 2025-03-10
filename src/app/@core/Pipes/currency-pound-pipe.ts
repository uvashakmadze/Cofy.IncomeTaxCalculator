import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'CurrencyPound'
})

export class CurrencyPound implements PipeTransform {
    transform(value: number): string {
      return `£ ${value.toFixed(2)}`;
    }
  }