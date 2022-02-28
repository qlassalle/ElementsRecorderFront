import {ArticleService} from './ArticleService';
import {Observable, of} from 'rxjs';
import {Article} from '../../model/Article';
import {ArticleGenerator} from '../../../../tests/article/model/ArticleGenerator';

interface InMemoryFields {
  lastCreatedArticle;
}

export class InMemoryArticleService implements ArticleService, InMemoryFields {

  lastCreatedArticle;
  articleGenerator: ArticleGenerator = new ArticleGenerator();

  getAll(): Observable<Article[]> {
    return of([]);
  }

  create(article: any) {
    this.lastCreatedArticle = article;
    return this.articleGenerator.observableOfOneArticle();
  }

  get(id: string): Observable<Article> {
    return this.articleGenerator.observableOfOneArticle();
  }
}
