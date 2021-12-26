import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {TestCases} from '../registration/TestCases';
import {TestPage} from '../../shared/TestPage';
import {HttpErrorResponse} from '@angular/common/http';
import {asyncData, asyncError} from '../../shared/async-observable-helpers';
import {stringify} from 'querystring';

describe('LoginComponent', () => {
  const accessTokenKey = 'access_token';
  const accessToken = 'ey123456.abcdefghi.7890cvbn';
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy;
  let page: TestPage<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
       declarations: [LoginComponent],
       providers: [
         {provide: AuthenticationService, useValue: initMocks()},
         {provide: Router, useValue: routerSpy}
       ],
      imports: [ReactiveFormsModule, FormsModule]
     })
    .compileComponents();

    localStorage.clear();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    page = new TestPage<LoginComponent>(fixture);
    fixture.detectChanges();
  });

  function initMocks() {
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    authenticationServiceSpy.login.withArgs({email: 'testemail@gmail.com', password: 'Passw0rd.'})
                            .and
                            .returnValue(asyncData({access_token: accessToken}));
    authenticationServiceSpy.login.withArgs({email: 'testemail@gmail.com', password: 'wrongpass'})
                            .and
                            .returnValue(asyncError(new HttpErrorResponse(
                              {status: 403, error: {message: 'Username or password invalid'}}
                              )));
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.stub();
    return authenticationServiceSpy;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be possible to click on login button when fields are empty', () => {
    expect(page.getButton(TemplateConstants.LOGIN_BUTTON).disabled).toBeTrue();
  });

  it('should call service and set access_token in local storage', async () => {
    expect(localStorage.getItem(accessTokenKey)).toBeNull();
    const authenticationData = {email: 'testemail@gmail.com', password: 'Passw0rd.'};

    await component.onSubmit(authenticationData);
    expect(localStorage.getItem(accessTokenKey)).toEqual(accessToken);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/articles');
  });

  TestCases.EMAIL.forEach(({email, valid}) => {
    it(`when email is ${email} error div should have hidden property: ${valid}`, () => {
      page.testErrorMessageTriggering(TemplateConstants.EMAIL_INPUT, TemplateConstants.EMAIL_ERRORS_DIV,
        TemplateConstants.INVALID_EMAIL_MESSAGE_DIV, email, valid, 'Please provide a valid email.');
      expect(page.getButton(TemplateConstants.LOGIN_BUTTON).disabled);
    });
  });

  it('should display error messages when credentials are incorrect', async () => {
    expect(localStorage.getItem(accessTokenKey)).toBeNull();
    expect(page.getDiv(TemplateConstants.SERVER_ERROR_DIV)).toBeNull();
    const authenticationData = {email: 'testemail@gmail.com', password: 'wrongpass'};
    await component.onSubmit(authenticationData);
    fixture.detectChanges();
    expect(localStorage.getItem(accessTokenKey)).toBeNull();
    expect(page.getDiv(TemplateConstants.SERVER_ERROR_DIV).textContent.trim()).toEqual('Username or password invalid');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
  });

  class TemplateConstants {
    static EMAIL_INPUT = '#email';
    static EMAIL_ERRORS_DIV = '#email-errors';
    static INVALID_EMAIL_MESSAGE_DIV = '#invalid-email';
    static LOGIN_BUTTON = '#login-button';
    static SERVER_ERROR_DIV = '#server-error';
  }
});
