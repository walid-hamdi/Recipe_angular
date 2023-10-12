import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;
  constructor(public payload?: Ingredient) {}
}
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;
  constructor(public payload?: Ingredient[]) {}
}
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';

export class UpdateIngredients implements Action {
  readonly type: string = UPDATE_INGREDIENT;
  constructor(public payload?: { index: number; payload: Ingredient }) {}
}
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export class DeleteIngredients implements Action {
  readonly type: string = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export type ShoppingListTypes =
  | AddIngredient
  | AddIngredients
  | UpdateIngredients
  | DeleteIngredients;
