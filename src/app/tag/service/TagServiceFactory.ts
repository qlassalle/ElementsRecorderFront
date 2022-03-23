import {HttpClient} from '@angular/common/http';
import {HttpTagService} from './http-tag.service';
import {InMemoryTagService} from './in-memory-tag.service';
import {environment} from '../../../environments/environment';

export function tagServiceFactory(http: HttpClient) {
  if (environment.production) {
    return new HttpTagService(http);
  }

  return new InMemoryTagService();
}
