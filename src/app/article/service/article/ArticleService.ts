import {Observable} from 'rxjs';
import {Article} from '../../model/Article';

export interface ArticleService {

  getAll(): Observable<Article[]>;
  create(article: any);
}
