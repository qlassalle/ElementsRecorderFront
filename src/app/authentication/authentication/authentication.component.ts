import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  activeForm = 'login';

  constructor() { }

  ngOnInit(): void {
  }

  toggleActiveForm(formName: string) {
    if (this.activeForm !== formName) {
      this.activeForm = this.activeForm === 'sign_up' ? 'login' : 'sign_up';
    }
  }
}
