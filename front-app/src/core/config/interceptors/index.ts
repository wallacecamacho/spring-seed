/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Provider } from '@angular/core';

import { EnsureHttpsInterceptor } from './ensure-https.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { NoopInterceptor } from './noop.interceptor';
import { TrimNameInterceptor } from './trim-name.interceptor';
import { UploadInterceptor } from './upload.interceptor';
import { LanguegeInterceptor } from './language.interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorAppProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LanguegeInterceptor, multi: true }
];
