import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AccessToken} from '../model/input/AccessToken';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = environment.serverUrl + '/authenticate';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  register(registrationData: any) {
    return this.http.post(this.url + '/register', registrationData, this.httpOptions).pipe();
  }

  login(loginData: any): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.url, loginData, this.httpOptions).pipe();
  }
}
