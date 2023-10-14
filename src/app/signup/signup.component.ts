import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  submit(form: NgForm) {
    const { username, email, password } = form.value;

    this.isLoading = true;
    this.authService.register(username, email, password).subscribe(
      (responseAuth) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.isLoading = false;
        this.error = error;
      }
    );
    form.reset();
  }
}
