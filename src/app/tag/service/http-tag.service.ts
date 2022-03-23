import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TagService} from './TagService';
import {Observable} from 'rxjs';
import {Tag} from '../model/Tag';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpTagService implements TagService {

  constructor(private http: HttpClient) { }

  private url = environment.serverUrl + '/tags';

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url).pipe();
  }
}
