import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  error: null | string = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit(form: NgForm) {
    const { email, password } = form.value;
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      (responseData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
        form.reset();
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }
}
