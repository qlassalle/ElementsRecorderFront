import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {TestCases} from '../registration/TestCases';
import {TestPage} from '../../shared/TestPage';

describe('LoginComponent', () => {
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
    authenticationServiceSpy.login.and.returnValue(of({access_token: accessToken}));
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

  it('should call service and set access_token in local storage', () => {
    expect(localStorage.getItem('access_token')).toBeNull();
    const authenticationData = {email: 'testemail@gmail.com', password: 'Passw0rd.'};

    component.onSubmit(authenticationData);
    expect(localStorage.getItem('access_token')).toEqual(accessToken);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/articles');
  });

  TestCases.EMAIL.forEach(({email, valid}) => {
    it(`when email is ${email} error div should have hidden property: ${valid}`, () => {
      page.testErrorMessageTriggering(TemplateConstants.EMAIL_INPUT, TemplateConstants.EMAIL_ERRORS_DIV,
        TemplateConstants.INVALID_EMAIL_MESSAGE_DIV, email, valid, 'Please provide a valid email.');
      expect(page.getButton(TemplateConstants.LOGIN_BUTTON).disabled);
    });
  });

  class TemplateConstants {
    static EMAIL_INPUT = '#email';
    static EMAIL_ERRORS_DIV = '#email-errors';
    static INVALID_EMAIL_MESSAGE_DIV = '#invalid-email';
    static LOGIN_BUTTON = '#login-button';
  }
});
