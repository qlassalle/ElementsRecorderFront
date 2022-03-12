import {Observable} from 'rxjs';
import {Resource} from '../../model/Resource';

export abstract class ResourceService {

  abstract create(resource: any): Observable<Resource>;
  abstract get(id: string): Observable<Resource>;
  abstract getAll(): Observable<Resource[]>;
  abstract update(id: string, resource: any): Observable<Resource>;
  abstract delete(id: string): void;
}
