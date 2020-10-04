import {TestBed} from '@angular/core/testing';

import {ArticleService} from './article.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Article} from '../../model/Article';

const SERVER_URL = 'http://localhost:8080/article/';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ArticleService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can retrieve all articles', () => {
    const expectedResponse: Article[] =
      [{
        id: 1,
        name: 'Another article',
        description: 'The new one',
        rating: 2,
        url: '',
        created_at: '2020-09-28T20:22:33.301528Z',
        updated_at: '2020-09-28T20:22:33.301528Z'
      }];

    service.getArticles()
           .subscribe(data => expect(data).toEqual(expectedResponse));

    const req = httpTestingController.expectOne(SERVER_URL);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedResponse);
  });

  it('should return one article', () => {
    const expectedResponse: Article =
      {
        id: 1,
        name: 'Another article',
        description: 'The new one',
        rating: 2,
        url: '',
        created_at: '2020-09-28T20:22:33.301528Z',
        updated_at: '2020-09-28T20:22:33.301528Z'
      };

    service.getArticle(1)
           .subscribe(data => expect(data).toEqual(expectedResponse));

    const req = httpTestingController.expectOne(SERVER_URL + '1');

    expect(req.request.method).toEqual('GET');

    req.flush(expectedResponse);
  });

  it('should return a 404 when article isn\'t found', () => {
    const expectedResponse = 'No such article exists';

    service.getArticle(2190)
           .subscribe(() => fail('Should have failed with a 404 error'),
                      (error: HttpErrorResponse) => {
                        expect(error.status).toEqual(404, 'status');
                        expect(error.error).toEqual(expectedResponse, 'response');
           });

    const req = httpTestingController.expectOne(SERVER_URL + '2190');

    req.flush(expectedResponse, {status: 404, statusText: 'Not Found'});
  });

  it('Should return the created article when posting to server', () => {
    const newArticle: Article = {
      id: 1,
      name: 'My new article',
      description: 'The latest resource I found!',
      rating: 5,
      url: 'www.amazingresource.com',
      created_at: null,
      updated_at: null
    };

    const expectedResponse: Article = {
      id: 1,
      name: 'My new article',
      description: 'The latest resource I found!',
      rating: 5,
      url: 'www.amazingresource.com',
      created_at: '2020-09-28T20:22:33.301528Z',
      updated_at: '2020-09-28T20:22:33.301528Z'
    };


    service.create(newArticle)
      .subscribe((response) => expect(response).toEqual(expectedResponse),
                 () => fail('Creation of article should not fail'));

    const req = httpTestingController.expectOne(SERVER_URL);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newArticle);

    req.flush(expectedResponse);
  });
});
