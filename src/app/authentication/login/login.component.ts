import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {AccessToken} from '../model/input/AccessToken';
import {Router} from '@angular/router';
import {SharedConstants} from '../../shared/shared.constants';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared-authentication.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  variable = 'abc';

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(SharedConstants.EMAIL_REGEX)]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(loginData) {
    this.authenticationService.login(loginData).subscribe((accessToken: AccessToken) => {
      localStorage.setItem('access_token', accessToken.access_token);
      this.router.navigateByUrl('/articles');
    },
      (error: HttpErrorResponse) => {
        this.loginForm.setErrors({serverError: error.error.message});
      });
  }

  get email() {
    return this.loginForm.get('email');
  }
}
