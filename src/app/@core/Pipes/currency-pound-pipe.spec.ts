import { PipeTransform } from "@angular/core";
import { CurrencyPound } from "./currency-pound-pipe";

describe('CurrencyPoundPipe', () => {
  let pipe: PipeTransform;

  beforeEach(() => {
    pipe = new CurrencyPound();
  });

  it('formats pound currency', () => {
    expect(pipe.transform(100000.565)).toBe('£ 100000.57');
  });
});