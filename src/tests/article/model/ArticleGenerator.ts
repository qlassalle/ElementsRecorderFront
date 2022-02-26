import {Article} from '../../../app/article/model/Article';
import {of} from 'rxjs';

export class ArticleGenerator {
  static observableOfOneArticleAsArray() {
    return of(ArticleGenerator.oneArticleAsArray());
  }

  static observableOfOneArticle() {
    return of(ArticleGenerator.oneFullArticle);
  }

  static oneFullArticle(): Article {
    return {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Another article',
      description: 'The new one',
      rating: 2,
      url: '',
      created_at: '2020-09-28T20:22:33.301528Z',
      updated_at: '2020-09-28T20:22:33.301528Z'
    };
  }

  static oneArticleFromForm(): Article {
    return {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'My new article',
      description: 'The latest resource I found!',
      rating: 5,
      url: 'www.amazingresource.com',
      created_at: null,
      updated_at: null
    };
  }

  static oneArticleAsArray(): Article[] {
    return [{
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Another article',
      description: 'The new one',
      rating: 2,
      url: '',
      created_at: '2020-09-28T20:22:33.301528Z',
      updated_at: '2020-09-28T20:22:33.301528Z'
    }];
  }
}
