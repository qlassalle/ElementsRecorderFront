import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {AccessToken} from '../model/input/AccessToken';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared-authentication.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(loginData) {
    this.authenticationService.login(loginData).subscribe((accessToken: AccessToken) => {
      localStorage.setItem('access_token', accessToken.access_token);
      this.router.navigateByUrl('/articles');
    });
  }

}
