import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuNavbarComponent} from './menu-navbar.component';

describe('NavbarComponent', () => {
  let component: MenuNavbarComponent;
  let fixture: ComponentFixture<MenuNavbarComponent>;
  const expiredJWT = 'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNjU4ODE5NDcwLCJpYXQiOjE2NTg4MTk0NzB9.RXeJLBjTEunHyZRnt6YWjI4ms6JVA3MobVkn8Qi2b24';
  const validJWT = 'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxOTc0NDM4NjcwLCJpYXQiOjE2NTg4MTk0NzB9.13JlYPa0uiRN52mtqRDDZhTLoAiNJoC5dD5pYeHVmzY';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(MenuNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the sign in link when user is unauthenticated and has no token in local storage', () => {
    expect(component.authenticationLink).toEqual('Sign in');
  });

  it('should display the username when user is logged in', () => {
    localStorage.setItem('access_token', validJWT);
    component.ngOnInit();
    expect(component.authenticationLink).toEqual('John Doe');
  });

  it('should display the sign in link when user is unauthenticated due to an expired token', () => {
    localStorage.setItem('access_token', expiredJWT);
    component.ngOnInit();
    expect(component.authenticationLink).toEqual('Sign in');
  });
});
