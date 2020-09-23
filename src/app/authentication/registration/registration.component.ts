import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RegistrationService} from '../service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  activeForm = 'sign_up';
  registrationForm;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) {
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
    this.registrationService.register(registrationData).subscribe();
  }

  toggleActiveForm(formName: string) {
    if (this.activeForm !== formName) {
      this.activeForm = this.activeForm === 'sign_up' ? 'login' : 'sign_up';
    }
  }
}
