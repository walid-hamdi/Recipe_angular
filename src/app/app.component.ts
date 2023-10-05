import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}

/*
 TODO: Handle the toggle dropdown btn-group
 understand passing data between parent <=> child clearly
 understand creating directors (listeners binding and host)
 understand dependency injection and services
 understand observables
 */
