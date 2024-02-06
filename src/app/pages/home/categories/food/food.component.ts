import { Component, OnInit } from '@angular/core';
import { Category, SubCategory } from "../../../../shared/models/category";
import { FirebaseService } from "../../../../services/firebase.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from '@angular/fire/compat/database';
// @ts-ignore
import c from '../../../../../assets/categories.json';
import { Observable } from 'rxjs';
import { Product } from "../../../../shared/models/proudctsModel";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {

  category!: Category | undefined;
  subCategory: SubCategory | undefined;
  categories: Category[] = c;
  productForm: FormGroup;
  showSubCategories = false;
  items!: Product[];

  constructor(private fb: FormBuilder,
    private firebase: FirebaseService,
    private afDatabase: AngularFireDatabase) {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      image: ['Test', Validators.required],
      description: ['Test', Validators.required],
      categoryName: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.category = this.categories.find(x => x.name === 'Food');

    this.firebase.getProductsList().subscribe(x => {
      this.items = x;
      console.log(this.items);
    })

  }


  // getAllFoods() {
  //   this.firebase.getProductsList().subscribe(allFoods => {
  //     this.someOther = allFoods

  //     for (let i = 0; i < this.someOther.length; i++) {

  //       this.items?.categoryName = this.someOther[i].categoryName

  //       console.log (this.someOther[i].key, this.someOther[i].categoryName);
  //     }

  //     // this.items = this.someOther[0]
  //     // console.log(this.items?.categoryName)
  //   })
  // }


  addProduct() {
    if (this.productForm.valid) {
      const productBody = {
        ...this.productForm.value
      }
      this.firebase.createProduct(this.productForm.value);
    } else {
      console.log('Not Valid');
    }
  }

  selectedSubCategory($event: Event) {
    // @ts-ignore
    this.productForm.addControl('categoryName_1', new FormControl($event.target.value))
  }

  categoryChanges($event: Event) {
    // @ts-ignore
    const categorySelected = $event.target.value;
    this.showSubCategories = false;
    this.productForm.patchValue({
      categoryName: categorySelected
    })
    this.subCategory = this.category?.subCategories.find(y => categorySelected === y.name)

    if (this.subCategory && this.subCategory.subCategories && this.subCategory.subCategories.length > 0) {
      this.showSubCategories = true;
    }
  }
}



// this.afDatabase.object('products/').valueChanges().subscribe(action => {

//   this.someOther = action


//   console.log(this.someOther)


// })



// console.log(
//   this.afDatabase.list('products/').valueChanges().subscribe(items =>
//     {
//       console.log(items)
//     }
//   )
// )
