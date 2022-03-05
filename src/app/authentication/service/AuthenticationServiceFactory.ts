import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {HttpAuthenticationService} from './http-authentication.service';
import {InMemoryAuthenticationService} from './in-memory-authentication.service';

export function authenticationServiceFactory(http: HttpClient) {
  if (environment.production) {
    return new HttpAuthenticationService(http);
  }

  return new InMemoryAuthenticationService();
}
