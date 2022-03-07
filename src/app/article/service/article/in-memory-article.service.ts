import {ArticleService} from './ArticleService';
import {Observable, of, throwError} from 'rxjs';
import {Article} from '../../model/Article';
import {HttpErrorResponse} from '@angular/common/http';

export class InMemoryArticleService implements ArticleService {

  articles: Article[] = [];

  constructor() {
    this.articles = JSON.parse(localStorage.getItem('articles')) as Article[] ?? [];
  }

  getAll(): Observable<Article[]> {
    return of(this.articles);
  }

  create(article: any): Observable<Article> {
    if (article.name === 'Foojay') {
      return throwError(new HttpErrorResponse({
        status: 500,
        error: {message: 'Unable to reach backend, please try again in a few minutes.'}
      }));
    }

    const createdArticle: Article = {
      id: '00000000-0000-0000-0000-00000000000' + (this.articles.length + 1),
      name: article.name,
      description: article.description,
      rating: +article.rating,
      url: article.url,
      created_at: '2020-09-28T20:22:33.301528Z',
      updated_at: '2020-09-28T20:22:33.301528Z'
    };
    this.articles.push(createdArticle);
    this.updateLocalStorage();
    return of(createdArticle);
  }

  get(id: string): Observable<Article> {
    return of(this.articles.find(article => article.id === id));
  }

  delete(id: string): void {
    this.articles = this.articles.filter(article => article.id !== id);
    this.updateLocalStorage();
  }

  update(id: string, article: any): Observable<Article> {
    return undefined;
  }

  private updateLocalStorage() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }
}
