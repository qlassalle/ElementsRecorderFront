import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {AccessToken} from '../model/input/AccessToken';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../shared-authentication.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      email: '',
      password: '',
      confirm_password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(registrationData) {
    this.authenticationService.register(registrationData).subscribe((data: AccessToken) => {
      localStorage.setItem('access_token', data.access_token);
      this.router.navigateByUrl('/articles');
    },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }
}
