import {Injectable} from '@angular/core';
import {TagService} from './TagService';
import {Observable, of} from 'rxjs';
import {Tag} from '../model/Tag';

@Injectable({
  providedIn: 'root'
})
export class InMemoryTagService implements TagService {

  tags: Tag[] = [];

  constructor() {
    this.tags = JSON.parse(localStorage.getItem('tags')) as Tag[] ?? [];
  }

  feed(tags: Tag[]) {
    this.tags = tags;
  }

  getOrCreate(tagName: any): Observable<Tag> {
    const exists = this.tags.indexOf(tagName);
    if (exists !== -1) {
      return of(this.tags[exists]);
    }

    const tag: Tag = {
      id: '00000000-0000-0000-0000-00000000000' + (this.tags.length + 1),
      name: tagName
    };
    this.tags.push(tag);
    localStorage.setItem('tags', JSON.stringify(this.tags));
    return of(tag);
  }

  getAll(): Observable<Tag[]> {
    return of(this.tags);
  }
}
