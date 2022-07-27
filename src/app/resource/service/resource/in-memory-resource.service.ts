import {ResourceService} from './ResourceService';
import {Observable, of, throwError} from 'rxjs';
import {Resource} from '../../model/Resource';
import {HttpErrorResponse} from '@angular/common/http';
import {InMemoryTagService} from '../../../tag/service/in-memory-tag.service';
import {Tag} from '../../../tag/model/Tag';

export class InMemoryResourceService implements ResourceService {

  inMemoryTagService: InMemoryTagService = new InMemoryTagService();
  resources: Resource[] = [];

  constructor() {
    this.resources = JSON.parse(localStorage.getItem('resources')) as Resource[] ?? [];
  }

  feed(resources: Resource[]) {
    this.resources = resources;
  }

  clear() {
    this.resources = [];
    localStorage.removeItem('resources');
  }

  getAll(): Observable<Resource[]> {
    return of(this.resources);
  }

  create(resource: any): Observable<Resource> {
    if (resource.name === 'Foojay') {
      return throwError(new HttpErrorResponse({
        status: 500,
        error: {message: 'Unable to reach backend, please try again in a few minutes.'}
      }));
    }

    const tags: Tag[] = [];
    resource.tags?.forEach(tag => (this.inMemoryTagService.getOrCreate(tag).subscribe(t => tags.push(t))));
    const createdResource: Resource = {
      id: '00000000-0000-0000-0000-00000000000' + (this.resources.length + 1),
      name: resource.name,
      description: resource.description,
      rating: +resource.rating,
      url: resource.url,
      tags,
      created_at: '2020-09-28T20:22:33.301528Z',
      updated_at: '2020-09-28T20:22:33.301528Z'
    };
    this.resources.push(createdResource);
    this.updateLocalStorage();
    return of(createdResource);
  }

  get(id: string): Observable<Resource> {
    return of(this.resources.find(resource => resource.id === id));
  }

  delete(id: string): void {
    this.resources = this.resources.filter(resource => resource.id !== id);
    this.updateLocalStorage();
  }

  update(id: string, resource: any): Observable<Resource> {
    return undefined;
  }

  private updateLocalStorage() {
    localStorage.setItem('resources', JSON.stringify(this.resources));
  }
}
