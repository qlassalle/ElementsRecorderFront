import {Observable} from 'rxjs';
import {Tag} from '../model/Tag';

export abstract class TagService {
  abstract getAll(): Observable<Tag[]>;
}
