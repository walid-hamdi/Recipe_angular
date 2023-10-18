import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  isAuth = false;
  private userSub?: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authUser) => authUser.user))
      .subscribe((user) => {
        this.isAuth = !!user; // user ? true : false
      });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  ngOnDestroy(): void {
    // if (this.userSub) {
    //   this.userSub = this.authService.user.unsubscribe();
    // }
  }

  onLogout() {
    this.authService.logout();
  }
}
