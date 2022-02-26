import {Observable} from 'rxjs';
import {Article} from '../../model/Article';

export interface ArticleService {

  getArticles(): Observable<Article[]>;
  create(article: any);
}
