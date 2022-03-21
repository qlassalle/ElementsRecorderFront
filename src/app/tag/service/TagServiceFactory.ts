import {InMemoryTagService} from './in-memory-tag.service';

export function tagServiceFactory() {
  return new InMemoryTagService();
}
