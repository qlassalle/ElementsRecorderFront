import {Article} from '../../../app/article/model/Article';
import {of} from 'rxjs';

export class ArticleGenerator {
  static observableOfOneArticleAsArray() {
    return of(
      [{
        id: 1,
        name: 'Another article',
        description: 'The new one',
        rating: 2,
        url: '',
        created_at: '2020-09-28T20:22:33.301528Z',
        updated_at: '2020-09-28T20:22:33.301528Z'
      }]);
  }

  static observableOfOneArticle() {
    return of(ArticleGenerator.oneArticle);
  }

  static oneArticle(): Article {
    return {
      id: 1,
      name: 'Another article',
      description: 'The new one',
      rating: 2,
      url: '',
      created_at: '2020-09-28T20:22:33.301528Z',
      updated_at: '2020-09-28T20:22:33.301528Z'
    };
  }
}
