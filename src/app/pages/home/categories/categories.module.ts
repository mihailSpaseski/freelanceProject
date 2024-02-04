import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductFormComponent } from "./food/create-product-form/create-product-form.component";
import { FoodComponent } from "./food/food.component";
import { HrComponent } from "./hr/hr.component";
import { TourismComponent } from "./tourism/tourism.component";
import { RouterLink, RouterLinkActive, RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {path: 'food', component: FoodComponent},
  {path: 'human-resources', component: HrComponent},
  {path: 'tourism', component: TourismComponent}
];

@NgModule({
  declarations: [
    CreateProductFormComponent,
    FoodComponent,
    HrComponent,
    TourismComponent
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateProductFormComponent,
    FoodComponent,
    HrComponent,
    TourismComponent
  ]
})
export class CategoriesModule {
}
