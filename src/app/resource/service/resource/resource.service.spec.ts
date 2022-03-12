import {TestBed} from '@angular/core/testing';

import {HttpResourceService} from './http-resource.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Resource} from '../../model/Resource';
import {environment} from '../../../../environments/environment';
import {ResourceGenerator} from '../../../../tests/resource/model/ResourceGenerator';

const SERVER_URL = environment.serverUrl + '/resource/';

describe('ResourceService', () => {
  let service: HttpResourceService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const resourceGenerator: ResourceGenerator = new ResourceGenerator();

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpResourceService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can retrieve all resources', () => {
    let expectedResponse: Resource[];
    resourceGenerator.observableOfOneResourceAsArray().subscribe(resource => expectedResponse = resource);

    service.getAll()
           .subscribe(data => expect(data).toEqual(expectedResponse));

    const req = httpTestingController.expectOne(SERVER_URL);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedResponse);
  });

  it('should return one resource', () => {
    let expectedResponse: Resource;
    resourceGenerator.observableOfOneResource().subscribe(resource => expectedResponse = resource);

    service.get('00000000-0000-0000-0000-000000000001')
           .subscribe(data => expect(data).toEqual(expectedResponse));

    const req = httpTestingController.expectOne(SERVER_URL + '00000000-0000-0000-0000-000000000001');

    expect(req.request.method).toEqual('GET');

    req.flush(expectedResponse);
  });

  it('should return a 404 when resource isn\'t found', () => {
    const expectedResponse = 'No such resource exists';

    service.get('00000000-0000-0000-0000-000000000002')
           .subscribe(() => fail('Should have failed with a 404 error'),
                      (error: HttpErrorResponse) => {
                        expect(error.status).toEqual(404, 'status');
                        expect(error.error).toEqual(expectedResponse, 'response');
           });

    const req = httpTestingController.expectOne(SERVER_URL + '00000000-0000-0000-0000-000000000002');

    req.flush(expectedResponse, {status: 404, statusText: 'Not Found'});
  });

  it('Should return the created resource when posting to server', () => {
    const newResource: Resource = resourceGenerator.oneResourceFromForm();
    let expectedResponse: Resource;
    resourceGenerator.observableOfOneResource().subscribe(resource => expectedResponse = resource);

    service.create(newResource)
           .subscribe((response) => expect(response).toEqual(expectedResponse),
             () => fail('Creation of resource should not fail'));

    const req = httpTestingController.expectOne(SERVER_URL);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newResource);

    req.flush(expectedResponse);
  });
});
