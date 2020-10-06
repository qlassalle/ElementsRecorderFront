import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';

describe('LoginComponent', () => {
  const accessToken = 'ey123456.abcdefghi.7890cvbn';
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy;

  beforeEach(waitForAsync(() => {
    const {formBuilderSpy, authenticationServiceSpy} = initMocks();
    TestBed.configureTestingModule({
       declarations: [LoginComponent],
       providers: [
         {provide: FormBuilder, useValue: formBuilderSpy},
         {provide: AuthenticationService, useValue: authenticationServiceSpy},
         {provide: Router, useValue: routerSpy}
       ]
     })
    .compileComponents();

    localStorage.clear();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service and set access_token in local storage', () => {
    expect(localStorage.getItem('access_token')).toBeNull();
    const authenticationData = {email: 'testemail@gmail.com', password: 'Passw0rd.'};

    component.onSubmit(authenticationData);
    expect(localStorage.getItem('access_token')).toEqual(accessToken);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/articles');
  });

  function initMocks() {
    const formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group', 'reset']);
    formBuilderSpy.group.and.returnValue({email: '', password: ''});
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    authenticationServiceSpy.login.and.returnValue(of({access_token: accessToken}));
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.stub();
    return {formBuilderSpy, authenticationServiceSpy};
  }
});
