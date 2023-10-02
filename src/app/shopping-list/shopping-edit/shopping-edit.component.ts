import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') form?: NgForm;
  index?: number;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit(): void {
    const { name, amount } = this.shoppingListService.getIngredient(10);
    this.form?.setValue({
      name,
      amount,
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    this.shoppingListService.addIngredient(
      new Ingredient(value.name, value.amount)
    );
  }

  
}
