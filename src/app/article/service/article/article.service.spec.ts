import {TestBed} from '@angular/core/testing';

import {HttpArticleService} from './http-article.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Article} from '../../model/Article';
import {environment} from '../../../../environments/environment';
import {ArticleGenerator} from '../../../../tests/article/model/ArticleGenerator';

const SERVER_URL = environment.serverUrl + '/article/';

describe('ArticleService', () => {
  let service: HttpArticleService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const articleGenerator: ArticleGenerator = new ArticleGenerator();

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpArticleService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can retrieve all articles', () => {
    let expectedResponse: Article[];
    articleGenerator.observableOfOneArticleAsArray().subscribe(article => expectedResponse = article);

    service.getAll()
           .subscribe(data => expect(data).toEqual(expectedResponse));

    const req = httpTestingController.expectOne(SERVER_URL);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedResponse);
  });

  it('should return one article', () => {
    let expectedResponse: Article;
    articleGenerator.observableOfOneArticle().subscribe(article => expectedResponse = article);

    service.get('00000000-0000-0000-0000-000000000001')
           .subscribe(data => expect(data).toEqual(expectedResponse));

    const req = httpTestingController.expectOne(SERVER_URL + '00000000-0000-0000-0000-000000000001');

    expect(req.request.method).toEqual('GET');

    req.flush(expectedResponse);
  });

  it('should return a 404 when article isn\'t found', () => {
    const expectedResponse = 'No such article exists';

    service.get('00000000-0000-0000-0000-000000000002')
           .subscribe(() => fail('Should have failed with a 404 error'),
                      (error: HttpErrorResponse) => {
                        expect(error.status).toEqual(404, 'status');
                        expect(error.error).toEqual(expectedResponse, 'response');
           });

    const req = httpTestingController.expectOne(SERVER_URL + '00000000-0000-0000-0000-000000000002');

    req.flush(expectedResponse, {status: 404, statusText: 'Not Found'});
  });

  it('Should return the created article when posting to server', () => {
    const newArticle: Article = articleGenerator.oneArticleFromForm();
    let expectedResponse: Article;
    articleGenerator.observableOfOneArticle().subscribe(article => expectedResponse = article);

    service.create(newArticle)
           .subscribe((response) => expect(response).toEqual(expectedResponse),
             () => fail('Creation of article should not fail'));

    const req = httpTestingController.expectOne(SERVER_URL);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newArticle);

    req.flush(expectedResponse);
  });
});
