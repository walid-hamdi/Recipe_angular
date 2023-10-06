import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, take, map } from 'rxjs';

@Injectable()
export class CannotAuth implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    {
      return this.authService.user.pipe(
        take(1),
        map((user) => {
          const isAuth = !!user;

          if (isAuth) return true;

          return this.router.createUrlTree(['/signin']);
        })
      );
    }
  }
}
