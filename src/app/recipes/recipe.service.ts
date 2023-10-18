import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping_list.actions';
import { DbService } from '../db/db.service';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];

  constructor(
    private dbService: DbService,
    private store: Store<fromApp.AppState>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }

  fetchRecipesByUserId(userId: number) {
    return this.dbService.getRecipe().subscribe((recipesData: Recipe[]) => {
      const filteredRecipe = recipesData.filter(
        (recipe) => recipe.userId === userId
      );
      console.log(filteredRecipe);
      this.setRecipes(filteredRecipe);
    });
  }

  fetchRecipes() {
    return this.dbService.getRecipe().subscribe((recipesData: Recipe[]) => {
      this.setRecipes(recipesData);
    });
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    return this.dbService.createRecipe(recipe);
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
