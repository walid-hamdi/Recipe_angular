import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  isAuth = false;
  private userSub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
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
