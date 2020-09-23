import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private url = environment.serverUrl + '/authenticate/register';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  register(registrationData: any) {
    return this.http.post(this.url, registrationData, this.httpOptions).pipe();
  }
}
