import {Resource} from '../../../app/resource/model/Resource';
import {Observable, of} from 'rxjs';

export class ResourceGenerator {

  private readonly resource = {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Another resource',
    description: 'The new one',
    rating: 2,
    url: '',
    created_at: '2020-09-28T20:22:33.301528Z',
    updated_at: '2020-09-28T20:22:33.301528Z'
  };

  oneResource(): Resource {
    return this.resource;
  }

  oneResourceAsArray(): Resource[] {
    return [this.resource];
  }

  observableOfOneResourceAsArray() {
    return of(this.oneResourceAsArray());
  }

  observableOfOneResource(): Observable<Resource> {
    return of(this.resource);
  }

  oneResourceFromForm(): Resource {
    return {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'My new resource',
      description: 'The latest resource I found!',
      rating: 5,
      url: 'www.amazingresource.com',
      created_at: null,
      updated_at: null
    };
  }
}
