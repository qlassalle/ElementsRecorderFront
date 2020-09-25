import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../shared-authentication.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.registrationForm = this.formBuilder.group({
      email: '',
      password: '',
      confirm_password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(registrationData) {
    this.registrationForm.reset();
    this.authenticationService.register(registrationData).subscribe();
  }
}
