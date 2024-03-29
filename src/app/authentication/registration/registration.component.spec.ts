import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {HttpAuthenticationService} from '../service/http-authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TestCases} from './TestCases';
import {TestPage} from '../../shared/TestPage';
import {InMemoryAuthenticationService} from '../service/in-memory-authentication.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let routerSpy;
  let page: TestPage<RegistrationComponent>;

  beforeEach(waitForAsync(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.stub();
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      providers: [
        {provide: HttpAuthenticationService, useValue: new InMemoryAuthenticationService()},
        {provide: Router, useValue: routerSpy}
      ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();

    localStorage.clear();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    page = new TestPage<RegistrationComponent>(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to register and redirect him to the list of resources', () => {
    expect(localStorage.getItem('access_token')).toBeNull();
    const authenticationData = {email: 'testemail@gmail.com', password: 'Passw0rd.', confirm_password: 'Passw0rd.'};

    component.onSubmit(authenticationData);
    expect(localStorage.getItem('access_token')).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/resources');
  });

  TestCases.EMAIL.forEach(({email, valid}) => {
    it(`[register] when email is ${email} error div should have hidden property: ${valid}`, () => {
      page.testErrorMessageTriggering(TemplateConstants.EMAIL_INPUT, TemplateConstants.EMAIL_ERRORS_DIV,
        TemplateConstants.INVALID_EMAIL_MESSAGE_DIV, email, valid, 'Please provide a valid email.');
      expect(page.getButton(TemplateConstants.REGISTER_BUTTON).disabled);
    });
  });

  TestCases.PASSWORD.forEach(({password, valid}) => {
    it(`When password is ${password} error message should be displayed: ${!valid}`, () => {
      expect(page.getDiv(TemplateConstants.PASSWORD_ERRORS_DIV).hasAttribute('hidden')).toEqual(true);
      page.setInputAndLoseFocus(TemplateConstants.PASSWORD_INPUT, password);
      expect(page.getDiv(TemplateConstants.PASSWORD_ERRORS_DIV).hasAttribute('hidden')).toEqual(valid);
      if (!valid) {
        expect(page.getDiv(TemplateConstants.INVALID_PASSWORD_MESSAGE_DIV).textContent.trim())
          .toEqual('Your password must contain at least 8 characters, one uppercase letter, one lower case letter, one number and one' +
            ' special character.');
      } else {
        expect(page.getDiv(TemplateConstants.INVALID_PASSWORD_MESSAGE_DIV)).toBeNull();
      }
      expect(page.getButton(TemplateConstants.REGISTER_BUTTON).disabled);
    });
  });


  it('Should display error message when passwords don\'t match', () => {
    expect(page.getDiv(TemplateConstants.PASSWORD_ERRORS_DIV).hasAttribute('hidden')).toEqual(true);
    page.setInputAndLoseFocus(TemplateConstants.PASSWORD_INPUT, 'AcorrectPassw0rd.');
    expect(page.getDiv(TemplateConstants.PASSWORD_ERRORS_DIV).hasAttribute('hidden')).toEqual(true);
    page.setInputAndLoseFocus(TemplateConstants.CONFIRM_PASSWORD_INPUT, 'AcorrectPassw0rd!');
    expect(page.getDiv(TemplateConstants.PASSWORD_ERRORS_DIV).hasAttribute('hidden')).toEqual(true);
    expect(page.getDiv(TemplateConstants.CONFIRM_PASSWORD_ERRORS_DIV).hasAttribute('hidden')).toEqual(false);
    expect(page.getDiv(TemplateConstants.INVALID_CONFIRM_PASSWORD_ERRORS_DIV).textContent.trim()).toEqual('Passwords don\'t match.');
    expect(page.getButton(TemplateConstants.REGISTER_BUTTON).disabled);
  });

  class TemplateConstants {
    static REGISTER_BUTTON = '#register-button';
    static EMAIL_INPUT = '#email';
    static PASSWORD_INPUT = '#password';
    static CONFIRM_PASSWORD_INPUT = '#confirm-password';
    static EMAIL_ERRORS_DIV = '#email-errors-register';
    static INVALID_EMAIL_MESSAGE_DIV = '#invalid-email-register';
    static PASSWORD_ERRORS_DIV = '#password-errors';
    static INVALID_PASSWORD_MESSAGE_DIV = '#invalid-password';
    static CONFIRM_PASSWORD_ERRORS_DIV = '#confirm-password-errors';
    static INVALID_CONFIRM_PASSWORD_ERRORS_DIV = '#invalid-confirm-password';
  }
});
