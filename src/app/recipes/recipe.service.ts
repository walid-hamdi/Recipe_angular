import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Spaghetti Carbonara',
      'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
    ),
    new Recipe(
      'Chicken Alfredo',
      'Creamy and cheesy pasta with grilled chicken breast and Alfredo sauce.',
      'https://images.unsplash.com/photo-1670508142255-f119391c4213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80'
    ),
    new Recipe(
      'Vegetable Stir-Fry',
      'A healthy stir-fry with assorted vegetables and tofu in a savory sauce.',
      'https://plus.unsplash.com/premium_photo-1664472637341-3ec829d1f4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
