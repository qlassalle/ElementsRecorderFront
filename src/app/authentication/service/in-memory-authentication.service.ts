import {AuthenticationService} from './AuthenticationService';
import {Observable, of, throwError} from 'rxjs';
import {AccessToken} from '../model/input/AccessToken';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryAuthenticationService implements AuthenticationService {

  private readonly accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  private readonly correctPassword = 'Passw0rd.';

  login(loginData: any): Observable<AccessToken> {
    if (loginData.password === this.correctPassword) {
      return of({access_token: this.accessToken});
    }

    return throwError(new HttpErrorResponse({status: 403, error: {message: 'Username or password invalid'}}));
  }

  register(registrationData: any): Observable<AccessToken> {
    return of({access_token: this.accessToken});
  }
}
