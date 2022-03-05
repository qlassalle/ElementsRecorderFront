import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import {AuthenticationService} from './service/AuthenticationService';
import {authenticationServiceFactory} from './service/AuthenticationServiceFactory';



@NgModule({
  declarations: [RegistrationComponent, LoginComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RegistrationComponent],
  providers: [
    FormBuilder,
    {
      provide: AuthenticationService,
      useFactory: authenticationServiceFactory,
      deps: [HttpClient]
    }
  ]
})
export class AuthenticationModule { }
