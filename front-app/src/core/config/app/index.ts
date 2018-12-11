import { APP_CONFIG, HERO_DI_CONFIG } from './app.config';

import { Provider } from '@angular/core';


export const configAppProviders: Provider[] = [
    { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
  ];
