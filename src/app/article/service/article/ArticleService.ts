import {Observable} from 'rxjs';
import {Article} from '../../model/Article';

export interface ArticleService {

  get(id: string): Observable<Article>;
  getAll(): Observable<Article[]>;
  create(article: any): Observable<Article>;
}
