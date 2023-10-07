import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private httpService: HttpClient
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }

  fetchRecipes() {
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
      )
      .subscribe((recipesData: Recipe[]) => {
        this.setRecipes(recipesData);
      });
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    return this.httpService.post(
      'https://udemy-course-angular-4a0fe-default-rtdb.firebaseio.com/recipes.json',
      recipe
    );
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    // TODO :Delete
    // this.httpService.delete("",)
    this.recipesChanged.next(this.recipes.slice());
  }
}
