import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';
// import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared-authentication.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(loginData) {
    this.loginForm.reset();
    this.authenticationService.login(loginData).subscribe(accessToken => {
      console.log(new JwtHelperService().decodeToken(accessToken.access_token));
    });
  }

}
