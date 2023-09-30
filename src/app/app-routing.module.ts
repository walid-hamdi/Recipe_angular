import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path:"",
    component:RecipesComponent
  },
  {
    path:"recipe",component:RecipesComponent,

  },
  {
    path:"shoppingList",
    component:ShoppingListComponent
  },
  {
    path:"**",
    redirectTo:"not-found"
  },
  {
    path:"not-found",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
