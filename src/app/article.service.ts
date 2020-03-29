import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from './model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'http://localhost:8080/article';

  constructor(private http: HttpClient) { }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + '/').pipe();
  }
}
