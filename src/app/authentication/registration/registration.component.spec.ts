import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {AuthenticationService} from '../service/authentication.service';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';
import {Router} from '@angular/router';

describe('RegistrationComponent', () => {
  const accessToken = 'ey123456.abcdefghi.7890cvbn';
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let routerSpy;

  beforeEach(waitForAsync(() => {
    const formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    formBuilderSpy.group.and.returnValue({email: '', password: '', confirm_password: ''});
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['register']);
    authenticationServiceSpy.register.and.returnValue(of({access_token: accessToken}));
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.stub();
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
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
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
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
});
