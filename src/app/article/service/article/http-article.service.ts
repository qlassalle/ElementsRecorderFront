import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../../model/Article';
import {environment} from '../../../../environments/environment';
import {ArticleService} from './ArticleService';

@Injectable({
  providedIn: 'root'
})
export class HttpArticleService implements ArticleService {

  private url = environment.serverUrl + '/article';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + '/').pipe();
  }

  get(id: string): Observable<Article> {
    return this.http.get<Article>(this.url + '/' + id).pipe();
  }

  create(articleData: any): Observable<Article> {
    return this.http.post(this.url + '/', articleData, this.httpOptions).pipe() as Observable<Article>;
  }

  delete(id: string): void {
    this.http.delete(this.url + '/' + id).pipe().subscribe();
  }

  update(id: string, article: any): Observable<Article> {
    return this.http.put(this.url + '/' + id, article, this.httpOptions).pipe() as Observable<Article>;
  }
}
