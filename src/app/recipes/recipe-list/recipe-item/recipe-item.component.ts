import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe | undefined;

  constructor(private recipeService: RecipeService, private router: Router) {}

  onSelected() {
    // this.recipeService.recipeSelected.emit(this.recipe);
    this.router.navigate(['recipes/' + this.recipe?.id]);
  }
}
