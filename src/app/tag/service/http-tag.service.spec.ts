import {TestBed} from '@angular/core/testing';

import {HttpTagService} from './http-tag.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('HttpTagServiceService', () => {
  let service: HttpTagService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpTagService);

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can retrieve all tags for a user', () => {
    const tags = [
      {id: 'ede0a991-ab48-4021-91f2-d783acdce61f', name: 'Java'},
      {id: 'ab77f6eb-fd3f-4e08-8a8d-c27794d549d3', name: 'Quarkus'}
    ];
    service.getAll().subscribe(result => expect(result).toEqual(tags));
    const req = httpTestingController.expectOne(request => request.url === 'http://localhost:8080/tags');
    req.flush(tags);
    httpTestingController.verify();
  });
});
