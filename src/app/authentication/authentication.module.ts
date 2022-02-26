import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';



@NgModule({
  declarations: [RegistrationComponent, LoginComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RegistrationComponent],
  providers: [
    FormBuilder
  ]
})
export class AuthenticationModule { }
