import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoading = false;
  error: string | null = null;
  constructor(private authService: AuthService) {}
  submit(form: NgForm) {
    const { username, email, password } = form.value;
    this.isLoading = true;
    this.authService.register(username, email, password).subscribe(
      (responseAuth) => {
        this.isLoading = false;
        console.log('REGISTER:', responseAuth.email);
      },
      (error) => {
        this.isLoading = false;
        this.error = error;
      }
    );
    form.reset();
  }
}
