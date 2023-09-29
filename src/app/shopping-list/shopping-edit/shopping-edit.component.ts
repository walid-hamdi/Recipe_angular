import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('inputName') inputNameRef?: ElementRef;
  @ViewChild('inputAmount') inputAmountRef?: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAdd() {
    const ingName = this.inputNameRef?.nativeElement.value;
    const ingAmount = this.inputAmountRef?.nativeElement.value;
    this.shoppingListService.addIngredient(new Ingredient(ingName, ingAmount));
  }
}
