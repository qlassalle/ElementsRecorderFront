import {Observable} from 'rxjs';
import {Article} from '../../model/Article';

export abstract class ArticleService {

  abstract create(article: any): Observable<Article>;
  abstract get(id: string): Observable<Article>;
  abstract getAll(): Observable<Article[]>;
  abstract update(id: string, article: any): Observable<Article>;
  abstract delete(id: string): void;
}
