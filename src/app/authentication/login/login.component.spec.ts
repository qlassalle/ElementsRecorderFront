import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    const formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    formBuilderSpy.group.and.returnValue({email: '', password: ''});
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    TestBed.configureTestingModule({
       declarations: [LoginComponent],
       providers: [
         {provide: FormBuilder, useValue: formBuilderSpy},
         {provide: AuthenticationService, useValue: authenticationServiceSpy}
       ]
     })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
