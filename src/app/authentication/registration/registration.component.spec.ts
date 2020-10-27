import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {AuthenticationService} from '../service/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {TestCases} from './TestCases';

describe('RegistrationComponent', () => {
  const accessToken = 'ey123456.abcdefghi.7890cvbn';
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let routerSpy;
  let page: Page;

  beforeEach(waitForAsync(() => {
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['register']);
    authenticationServiceSpy.register.and.returnValue(of({access_token: accessToken}));
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.stub();
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceSpy},
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
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to register and redirect him to the list of articles', () => {
    expect(localStorage.getItem('access_token')).toBeNull();
    const authenticationData = {email: 'testemail@gmail.com', password: 'Passw0rd.', confirm_password: 'Passw0rd.'};

    component.onSubmit(authenticationData);
    expect(localStorage.getItem('access_token')).toEqual(accessToken);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/articles');
  });


  function setInputAndLoseFocus(input: HTMLInputElement, value: string) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  TestCases.EMAIL.forEach(({email, valid}) => {
    it(`[register] when email is ${email} error div should have hidden property: ${valid}`, () => {
      const emailInput: HTMLInputElement = page.getEmailInput;
      expect(page.getEmailErrorsDiv.hasAttribute('hidden')).toEqual(true);
      setInputAndLoseFocus(emailInput, email);
      expect(page.getEmailErrorsDiv.hasAttribute('hidden')).toEqual(valid);
      if (!valid) {
        expect(page.getInvalidEmailMessageDiv.textContent.trim()).toEqual('Please provide a valid email.');
      }
      expect(page.getButton.disabled);
    });
  });

  TestCases.PASSWORD.forEach(({password, valid}) => {
    it(`When password is ${password} error message should be displayed: ${!valid}`, () => {
      const passwordInput: HTMLInputElement = page.getPasswordInput;
      expect(page.getPasswordErrorsDiv.hasAttribute('hidden')).toEqual(true);
      setInputAndLoseFocus(passwordInput, password);
      expect(page.getPasswordErrorsDiv.hasAttribute('hidden')).toEqual(valid);
      if (!valid) {
        expect(page.getInvalidPasswordMessageDiv.textContent.trim())
          .toEqual('Your password must contain at least 8 characters, one uppercase letter, one lower case letter, one number and one' +
            ' special character.');
      } else {
        expect(page.getInvalidPasswordMessageDiv).toBeNull();
      }
      expect(page.getButton.disabled);
    });
  });


  it('Should display error message when passwords don\'t match', () => {
    const passwordInput: HTMLInputElement = page.getPasswordInput;
    const confirmPasswordInput: HTMLInputElement = page.getConfirmPasswordInput;
    expect(page.getPasswordErrorsDiv.hasAttribute('hidden')).toEqual(true);
    setInputAndLoseFocus(passwordInput, 'AcorrectPassw0rd.');
    expect(page.getPasswordErrorsDiv.hasAttribute('hidden')).toEqual(true);
    setInputAndLoseFocus(confirmPasswordInput, 'AcorrectPassw0rd!');
    expect(page.getPasswordErrorsDiv.hasAttribute('hidden')).toEqual(true);
    expect(page.getConfirmPasswordErrorsDiv.hasAttribute('hidden')).toEqual(false);
    expect(page.getInvalidConfirmPasswordMessageDiv.textContent.trim()).toEqual('Passwords don\'t match.');
    expect(page.getButton.disabled);
  });

  class Page {
    navigateByUrlSpy: jasmine.Spy;

    get getButton() {
      return this.query<HTMLButtonElement>('#register-button');
    }

    get getEmailInput() {
      return this.query<HTMLInputElement>('#email');
    }

    get getPasswordInput() {
      return this.query<HTMLInputElement>('#password');
    }

    get getConfirmPasswordInput() {
      return this.query<HTMLInputElement>('#confirm-password');
    }

    get getEmailErrorsDiv() {
      return this.query<HTMLDivElement>('#email-errors-register');
    }

    get getInvalidEmailMessageDiv() {
      return this.query<HTMLDivElement>('#invalid-email-register');
    }

    get getPasswordErrorsDiv() {
      return this.query<HTMLDivElement>('#password-errors');
    }

    get getInvalidPasswordMessageDiv() {
      return this.query<HTMLDivElement>('#invalid-password');
    }

    get getConfirmPasswordErrorsDiv() {
      return this.query<HTMLDivElement>('#confirm-password-errors');
    }

    get getInvalidConfirmPasswordMessageDiv() {
      return this.query<HTMLDivElement>('#invalid-confirm-password');
    }

    constructor(pagedFixture: ComponentFixture<RegistrationComponent>) {
      const pagedRouterSpy = pagedFixture.debugElement.injector.get(Router) as any;
      this.navigateByUrlSpy = pagedRouterSpy.navigateByUrl;
    }

    private query<T>(selector: string): T {
      return fixture.nativeElement.querySelector(selector);
    }
  }
});
