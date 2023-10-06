import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router: Router) {}
  private firebaseKey = 'AIzaSyA8Pzf8QllgP_CE7R4PUeEgHJalocjDaXs';
  user = new BehaviorSubject<User | null>(null);
  tokenExpirationTimer: any = null;

  register(username: string, email: string, password: string) {
    return this.http
      .post<ResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          const { localId, email, idToken, expiresIn } = resData;
          this.handleStoreUserData(
            localId,
            email,
            idToken,
            parseInt(expiresIn)
          );
        })
      );
  }

  private handleStoreUserData(
    userId: string,
    email: string,
    tokenId: string,
    expiresIn: number
  ) {
    const tokenExpirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(userId, email, tokenId, tokenExpirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify({ ...user }));
  }

  login(email: string, password: string) {
    return this.http
      .post<ResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          const { localId, email, idToken, expiresIn } = resData;
          this.handleStoreUserData(
            localId,
            email,
            idToken,
            parseInt(expiresIn)
          );
        })
      );
  }
  autoLogin() {
    const dataStoredInLocalStorage = localStorage.getItem('userData');

    if (dataStoredInLocalStorage) {
      try {
        const { userId, email, _tokenId, _tokenExpirationDate } = JSON.parse(
          dataStoredInLocalStorage
        );

        const user = new User(
          userId,
          email,
          _tokenId,
          new Date(_tokenExpirationDate)
        );

        if (user && user.token) {
          this.user.next(user);
          const expirationDuration =
            new Date(_tokenExpirationDate).getTime() - new Date().getTime();
          this.autoLogout(expirationDuration);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
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

  logout() {
    this.user.next(null);
    this.router.navigate(['/signin']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
