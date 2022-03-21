import {Observable} from 'rxjs';
import {Tag} from '../model/Tag';

export abstract class TagService {

  abstract getOrCreate(tag: any): Observable<Tag>;
  abstract getAll(): Observable<Tag[]>;
}
