import {ArticleService} from './ArticleService';
import {Observable, of} from 'rxjs';
import {Article} from '../../model/Article';

export class InMemoryArticleService implements ArticleService {

  articles: Article[] = [];

  getAll(): Observable<Article[]> {
    return of(this.articles);
  }

  create(article: any): Observable<Article> {
    const createdArticle: Article = {
      id: '00000000-0000-0000-0000-000000000001',
      name: article.name,
      description: article.description,
      rating: +article.rating,
      url: article.url,
      created_at: '2020-09-28T20:22:33.301528Z',
      updated_at: '2020-09-28T20:22:33.301528Z'
    };
    this.articles.push(createdArticle);
    return of(createdArticle);
  }

  get(id: string): Observable<Article> {
    return of(this.articles.find(article => article.id === id));
  }

  delete(id: string): void {
    this.articles = this.articles.filter(article => article.id !== id);
  }

  update(id: string, article: any): Observable<Article> {
    return undefined;
  }
}
