import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {AuthenticationService} from '../service/authentication.service';
import {FormBuilder} from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(waitForAsync(() => {
    const formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    formBuilderSpy.group.and.returnValue({email: '', password: '', confirm_password: ''});
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['register']);
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      providers: [
        {provide: FormBuilder, useValue: formBuilderSpy},
        {provide: AuthenticationService, useValue: authenticationServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
