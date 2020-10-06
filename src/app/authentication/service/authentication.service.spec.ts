import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AccessToken} from '../model/input/AccessToken';
import {environment} from '../../../environments/environment';

const SERVER_URL = environment.serverUrl + '/authenticate';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login endpoint on server', () => {
    const expectedResponse: AccessToken = {access_token: 'ey123456.abcdefghi.7890cvbn'};
    const authenticationData = {email: 'testemail@gmail.com', password: 'Passw0rd.'};

    service.login(authenticationData)
           .subscribe(data => expect(data).toEqual(expectedResponse));

    const req = httpTestingController.expectOne(SERVER_URL + '/');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(authenticationData);

    req.flush(expectedResponse);
  });

  it('should handle a bad credentials response form server', () => {
    const expectedResponse = {message: 'Wrong credentials'};
    const authenticationData = {email: 'testemail@gmail.com', password: 'Passw0rd.'};

    service.login(authenticationData)
           .subscribe(() => fail('should have failed here'),
               (error: HttpErrorResponse) => {
             expect(error.status).toEqual(403, 'status');
             expect(error.error).toEqual(expectedResponse, 'response');
           });

    const req = httpTestingController.expectOne(SERVER_URL + '/');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(authenticationData);

    req.flush(expectedResponse, {status: 403, statusText: 'Forbidden'});
  });

  it('should call register endpoint on server', () => {
    const expectedResponse: AccessToken = {access_token: 'ey123456.abcdefghi.7890cvbn'};
    const registrationData = {email: 'emailcorrect@gmail.com', password: 'Azerty123#', confirm_password: 'Azerty123#'};

    service.register(registrationData)
           .subscribe(data => expect(data).toEqual(expectedResponse));

    const req = httpTestingController.expectOne(SERVER_URL + '/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(registrationData);

    req.flush(expectedResponse);
  });
});
