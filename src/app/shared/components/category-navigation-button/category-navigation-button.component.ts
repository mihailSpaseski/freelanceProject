import { Component } from '@angular/core';
// @ts-ignore
import c from '../../../../assets/categories.json';
import { Category } from '../../models/category';
@Component({
  selector: 'app-category-navigation-button',
  templateUrl: './category-navigation-button.component.html',
  styleUrls: ['./category-navigation-button.component.css'],
})
export class CategoryNavigationButtonComponent {
  categories: Category[] = c;
}
