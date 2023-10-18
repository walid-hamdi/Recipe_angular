import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private httpService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
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
