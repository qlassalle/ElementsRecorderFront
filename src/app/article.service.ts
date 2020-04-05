import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from './model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'http://localhost:8080/article';
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
}
