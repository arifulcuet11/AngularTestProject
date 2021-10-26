import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpApiInterceptor } from './intercepter';

export const httpInterceptProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true }
];
