import { Provider } from '@angular/core';
import { ENDPOINT_API } from '../api.config';
//import { USER_PROVIDER, USERS_API } from '../../_shared/services/usuario/usuario.service';
// import { SEARCH_MAPS_API, SEARCH_MAPS_PROVIDER } from '../../_shared/services/search-maps/search-maps.service';
//import { LOGIN_LOCADOR_API, LOGIN_LOCADOR_PROVIDER } from '../../_shared/services/login/login.service';

export function getAPI(): string {
  return ENDPOINT_API;
}

/** Http interceptor providers in outside-in order */
export const httpProviders: Provider[] = [
//  USER_PROVIDER,
 // { provide: USERS_API, useFactory: getAPI },
 // LOGIN_LOCADOR_PROVIDER,
 // { provide: LOGIN_LOCADOR_API, useFactory: getAPI },
//  SEARCH_MAPS_PROVIDER,
//  { provide: SEARCH_MAPS_API, useFactory: getAPI },
];
