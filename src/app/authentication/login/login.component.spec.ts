import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';

describe('LoginComponent', () => {
  const accessToken = 'ey123456.abcdefghi.7890cvbn';
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy;
  let page: Page;

  const emailTestCases = [
    {email: 'invalidemailzerzer', hiddenFinalState: false},
    {email: 'stillinvalid@invalid', hiddenFinalState: false},
    {email: 'stillinvalid@invalid.', hiddenFinalState: false},
    {email: 'stillinvalid@invalid.c', hiddenFinalState: false},
    {email: '@invalid.com', hiddenFinalState: false},
    {email: 'no white space@invalid.com', hiddenFinalState: false},
    {email: 'correctemail@gmail.com', hiddenFinalState: true},
    {email: 'allow_please@yahoo.fr', hiddenFinalState: true},
    {email: 'numbers12345678900too@hotmail.ru', hiddenFinalState: true},
  ];

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
    page = new Page(fixture);
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
    expect(page.getButton.disabled).toBeTrue();
  });

  it('should call service and set access_token in local storage', () => {
    expect(localStorage.getItem('access_token')).toBeNull();
    const authenticationData = {email: 'testemail@gmail.com', password: 'Passw0rd.'};

    component.onSubmit(authenticationData);
    expect(localStorage.getItem('access_token')).toEqual(accessToken);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/articles');
  });

  emailTestCases.forEach(({email, hiddenFinalState}) => {
    it(`when email is ${email} error div should have hidden property: ${hiddenFinalState}`, () => {
      const emailInput: HTMLInputElement = page.getEmailInput;
      expect(page.getEmailErrorsDiv.hasAttribute('hidden')).toEqual(true);
      emailInput.value = email;
      emailInput.dispatchEvent(new Event('input'));
      emailInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(page.getEmailErrorsDiv.hasAttribute('hidden')).toEqual(hiddenFinalState);
      if (!hiddenFinalState) {
        expect(page.getInvalidEmailMessageDiv.textContent.trim()).toEqual('Please provide a valid email.');
      }
    });
  });

  class Page {
    navigateByUrlSpy: jasmine.Spy;

    get getButton() {
      return this.query<HTMLButtonElement>('button');
    }

    get getEmailInput() {
      return this.queryAll<HTMLInputElement>('input')[0];
    }

    get getPasswordInput() {
      return this.queryAll<HTMLInputElement>('input')[1];
    }

    get getEmailErrorsDiv() {
      return this.query<HTMLDivElement>('#email-errors');
    }

    get getInvalidEmailMessageDiv() {
      return this.query<HTMLDivElement>('#invalid-email');
    }

    constructor(pagedFixture: ComponentFixture<LoginComponent>) {
      const pagedRouterSpy = pagedFixture.debugElement.injector.get(Router) as any;
      this.navigateByUrlSpy = pagedRouterSpy.navigateByUrl;
    }

    private query<T>(selector: string): T {
      return fixture.nativeElement.querySelector(selector);
    }

    private queryAll<T>(selector: string): T[] {
      return fixture.nativeElement.querySelectorAll(selector);
    }
  }
});
