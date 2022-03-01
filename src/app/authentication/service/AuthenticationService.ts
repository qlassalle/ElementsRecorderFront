import {Observable} from 'rxjs';
import {AccessToken} from '../model/input/AccessToken';

export interface AuthenticationService {
  register(registrationData: any): Observable<AccessToken>;
  login(loginData: any): Observable<AccessToken>;
}
