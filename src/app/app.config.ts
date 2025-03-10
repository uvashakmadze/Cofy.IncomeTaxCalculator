import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './@core/Services/globalerrorhandler.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiService } from './@core/Services/api.service';
import { AuthInterceptor } from '../Auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    ApiService
  ]
};
