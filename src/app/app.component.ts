import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}

/*
 TODO: Handle the toggle dropdown btn-group
 understand passing data between parent <=> child clearly
 understand creating directors (listeners binding and host)
 understand dependency injection and services
*/
