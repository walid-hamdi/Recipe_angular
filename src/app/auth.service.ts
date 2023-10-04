import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'jquery';
import { catchError, throwError } from 'rxjs';

interface ResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private firebaseKey = 'AIzaSyA8Pzf8QllgP_CE7R4PUeEgHJalocjDaXs';

  register(username: string, email: string, password: string) {
    return this.http
      .post<ResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<ResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error accrued';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exist';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
