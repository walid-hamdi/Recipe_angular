import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private httpService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return this.httpService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) return next.handle(request);

        // const modifiedRequest = (request = request.clone({
        //   setHeaders: { Authorization: `Bearer ${user.token}` },
        // }));

        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user?.token!),
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}
