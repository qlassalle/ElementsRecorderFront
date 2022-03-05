import {Observable} from 'rxjs';
import {AccessToken} from '../model/input/AccessToken';

export abstract class AuthenticationService {
  abstract register(registrationData: any): Observable<AccessToken>;
  abstract login(loginData: any): Observable<AccessToken>;
}
