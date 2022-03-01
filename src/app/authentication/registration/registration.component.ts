import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpAuthenticationService} from '../service/http-authentication.service';
import {Router} from '@angular/router';
import {AccessToken} from '../model/input/AccessToken';
import {HttpErrorResponse} from '@angular/common/http';
import {SharedConstants} from '../../shared/shared.constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../shared-authentication.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm;

  constructor(private formBuilder: FormBuilder, private authenticationService: HttpAuthenticationService, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(SharedConstants.EMAIL_REGEX)]],
      password: ['', Validators.pattern(SharedConstants.PASSWORD_REGEX)],
      confirm_password: ''
    }, { validators: passwordValidator});
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

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirm_password');
  }
}

function passwordValidator(form: FormGroup) {
  return form.controls.password.value === form.controls.confirm_password.value ? null : {mismatch: true};
}
