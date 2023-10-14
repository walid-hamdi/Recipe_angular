import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private httpService: HttpClient) {}

  createRecipe(recipe: Recipe) {
    return this.httpService.post(
      'https://udemy-course-angular-4a0fe-default-rtdb.firebaseio.com/recipes.json',
      recipe
    );
  }

  getRecipe() {
    return this.httpService
      .get<Recipe[]>(
        'https://udemy-course-angular-4a0fe-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((responseData: Recipe[]) => {
          const arrRecipes: Recipe[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              arrRecipes.push(responseData[key]);
            }
          }
          //  in case if we don't add ingredients
          return arrRecipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      );
  }
}
