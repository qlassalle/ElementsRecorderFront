import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {HttpArticleService} from './http-article.service';
import {InMemoryArticleService} from './in-memory-article.service';

export function articleServiceFactory(http: HttpClient) {
  if (environment.production) {
    return new HttpArticleService(http);
  }

  return new InMemoryArticleService();
}
