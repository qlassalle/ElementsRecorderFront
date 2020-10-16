import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {AccessToken} from '../model/input/AccessToken';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared-authentication.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(loginData) {
    this.authenticationService.login(loginData).subscribe((accessToken: AccessToken) => {
      localStorage.setItem('access_token', accessToken.access_token);
      this.router.navigateByUrl('/articles');
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
}
