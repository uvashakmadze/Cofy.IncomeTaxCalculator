import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandler } from './globalerrorhandler.service';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandler;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [GlobalErrorHandler]
      }).compileComponents();
      service = TestBed.inject(GlobalErrorHandler);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log global error', () => {
    var errorSpy = spyOn(console, 'error');
    var error = new Error("test error");
    service.handleError(error);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('Global Handler: ', error);
  });
});