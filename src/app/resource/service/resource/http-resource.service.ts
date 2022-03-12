import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Resource} from '../../model/Resource';
import {environment} from '../../../../environments/environment';
import {ResourceService} from './ResourceService';

@Injectable({
  providedIn: 'root'
})
export class HttpResourceService implements ResourceService {

  private url = environment.serverUrl + '/resource';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.url + '/').pipe();
  }

  get(id: string): Observable<Resource> {
    return this.http.get<Resource>(this.url + '/' + id).pipe();
  }

  create(resourceData: any): Observable<Resource> {
    return this.http.post(this.url + '/', resourceData, this.httpOptions).pipe() as Observable<Resource>;
  }

  delete(id: string): void {
    this.http.delete(this.url + '/' + id).pipe().subscribe();
  }

  update(id: string, resource: any): Observable<Resource> {
    return this.http.put(this.url + '/' + id, resource, this.httpOptions).pipe() as Observable<Resource>;
  }
}
