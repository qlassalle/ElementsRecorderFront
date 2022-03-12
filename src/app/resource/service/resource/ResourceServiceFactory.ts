import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {HttpResourceService} from './http-resource.service';
import {InMemoryResourceService} from './in-memory-resource.service';

export function resourceServiceFactory(http: HttpClient) {
  if (environment.production) {
    return new HttpResourceService(http);
  }

  return new InMemoryResourceService();
}
