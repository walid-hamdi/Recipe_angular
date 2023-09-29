import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Spaghetti Carbonara',
      'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      [
        { name: 'Spaghetti', amount: 200 },
        { name: 'Pancetta', amount: 100 },
        { name: 'Eggs', amount: 2 },
        { name: 'Parmesan Cheese', amount: 50 },
        { name: 'Black Pepper', amount: 1 },
      ]
    ),
    new Recipe(
      'Chicken Alfredo',
      'Creamy pasta dish with tender chicken, garlic, and Parmesan cheese.',
      'https://images.unsplash.com/photo-1670508142255-f119391c4213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
      [
        { name: 'Fettuccine Pasta', amount: 8 },
        { name: 'Chicken Breast', amount: 2 },
        { name: 'Heavy Cream', amount: 1 },
        { name: 'Garlic Cloves', amount: 3 },
        { name: 'Parmesan Cheese', amount: 0.5 },
      ]
    ),
    new Recipe(
      'Vegetable Stir-Fry',
      'A quick and healthy stir-fry with assorted vegetables and tofu.',
      'https://plus.unsplash.com/premium_photo-1664472637341-3ec829d1f4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80',
      [
        { name: 'Broccoli Florets', amount: 2 },
        { name: 'Carrots', amount: 2 },
        { name: 'Red Bell Pepper', amount: 1 },
        { name: 'Tofu', amount: 1 },
        { name: 'Soy Sauce', amount: 0.25 },
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
