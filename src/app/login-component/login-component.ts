import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../classes/UserLogin';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  user = new UserLogin();
  loginError = '';

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.user.username !== 'Admin' || this.user.password !== '123') {
      localStorage.setItem('isLoggedIn', 'false');
      this.loginError = 'Username or password is incorrect.';
      return;
    }

    this.loginError = '';
    localStorage.setItem('isLoggedIn', 'true');
    void this.router.navigateByUrl('/product-list-search-component');
  }
}