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
 TODO: 
 * Handle the toggle dropdown btn-group
 * When add a recipe the list should reflect immediately
 * The size should be fixed the card
 * The loading of the image should handled by cache
 * The shopping list form "add" only when there is valid ingredient
 * When i add the shopping list we need to check if the item is already exists
 * The loading login button should be changed
 * The error message should display in dynamic modal
 * When select an item and refresh issue
 * Delete item from db
 * Update item from db
 * Allow update , delete only the items belong that specific user
 * Handle add image of recipe (either from computer or internet)
 * Click to image display it in a model that appear fullscreen
 * Handle errors in form show them in alert
 * Split the app into modules
 * Add lazy loading
 * Add state management
 
 - understand passing data between parent <=> child clearly
 - understand creating directors (listeners binding and host)
 - understand dependency injection and services
 - understand observables 
 - understand auth guards
 - understand dynamic components
 - understand modules and performance (feature module - shared module - core module)
 - understand stand along component
 - Understand signals in angular

 */
