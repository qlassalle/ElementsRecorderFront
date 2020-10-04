import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../../model/Article';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = environment.serverUrl + '/article';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + '/').pipe();
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.url + '/' + id).pipe();
  }

  create(articleData: any) {
    return this.http.post(this.url + '/', articleData, this.httpOptions).pipe();
  }

  delete(id: number) {
    this.http.delete(this.url + '/' + id).pipe().subscribe();
  }

  update(id: number, article: any) {
    return this.http.put(this.url + '/' + id, article, this.httpOptions).pipe();
  }
}
