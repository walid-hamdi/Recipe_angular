import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe?: Recipe;
  recipeId?: number;
  myRecipe = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.recipeId = +params.get('id')!;
      this.recipe = this.recipeService.getRecipe(this.recipeId);

      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData.userId;
        this.myRecipe = this.recipe?.userId === userId;
      }
    });
  }

  onAddToShoppingList() {
    console.log('Details : ', this.recipe?.userId);

    this.recipeService.addIngredientToShoppingList(this.recipe!.ingredients);
    this.router.navigate(['/shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId!);
    this.router.navigate(['/recipes']);
  }
}
