import { Component, OnInit } from '@angular/core';
import { Category, SubCategory } from "../../../../shared/models/category";
import { FirebaseService } from "../../../../services/firebase.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {
  category!: Category;
  categoryForm!: FormGroup;

  constructor(private firebaseService: FirebaseService, private fb: FormBuilder, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(snapshot => {
      const id = snapshot.get('id');
      if (id) {
        this.firebaseService.getCategoriesList().subscribe((categories: Category[]) => {
          const category = categories.find(x => x.key === id);
          if (category) {
            this.category = category;
            console.log(this.category);
          }
        })
      }
    })
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      subcategory: ['', [Validators.required]]
    })
  }


  addCategory() {
    this.firebaseService.createCategory({name: 'Food', subCategories: []})
  }

  updateCategory() {
    this.firebaseService.updateCategory(this.category.key, {
      subCategories: [{name: 'Apples', subCategories: [{name: 'Green', subCategories: [{name: 'Resensko'}]}]}]
    })
  }

}
