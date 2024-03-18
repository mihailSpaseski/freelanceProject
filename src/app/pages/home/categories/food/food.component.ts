import { Component, OnInit } from '@angular/core';
import { Category, SubCategory } from '../../../../shared/models/category';
import { FirebaseService } from '../../../../services/firebase.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from '../../../../shared/models/proudctsModel';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/shared/models/users';

// @ts-ignore
import c from '../../../../../assets/categories.json';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  category!: Category | undefined;
  subCategory: SubCategory | undefined;
  categories: Category[] = c;
  productForm: FormGroup;
  showSubCategories = false;
  items!: Product[];
  filteredItems: Product[] = [];
  getUser: User[] = [];
  image: any;
  uploadProgress!: number;
  currentlyLoggedIn: string | undefined;
  gettingUserID: string | undefined;

  constructor(
    private fb: FormBuilder,
    private firebaseSer: FirebaseService,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      categoryName: ['', Validators.required],
      publishedBy: [''],
      username: [''],
      subCategory: [this.showSubCategories ? Validators.required : []],
    });
  }

  ngOnInit(): void {
    this.category = this.categories.find((x) => x.name === 'Food');

    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.gettingUserID = user.uid;
      }

      this.firebaseSer.getUsersList().subscribe(async (res: User[]) => {
        if (res) {
          const getUserID = res;

          const userAndProductsKey = getUserID.find(
            (x: { key: string | undefined }) => x.key === this.gettingUserID
          );

          this.productForm.patchValue({
            username: userAndProductsKey?.username,
          });
        }
      });
    });

    this.firebaseSer.getProductsList().subscribe((x) => {
      this.items = x;
      this.filteredItems = this.items;
    });
  }

  public fileSelected($event: any) {
    this.image = $event.target.files.item(0);
  }

  addProduct() {
    if (!this.gettingUserID) {
      return window.alert('You are not logged in!');
    }

    if (this.productForm.valid) {
      this.productForm.patchValue({ publishedBy: this.gettingUserID });

      this.firebaseSer
        .pushFileToStorage(this.image, this.productForm.value)
        .subscribe((result) => {
          if (result) {
            this.uploadProgress = result;
          }
        });
    } else {
      window.alert('Not Valid');
      console.log('Not Valid');
    }
  }

  selectedSubCategory($event: Event) {
    this.productForm.addControl(
      'subCategory',
      // @ts-ignore
      new FormControl($event.target.value)
    );
  }

  categoryChanges($event: Event) {
    // @ts-ignore
    const categorySelected = $event.target.value;
    this.showSubCategories = false;
    this.productForm.patchValue({
      categoryName: categorySelected,
    });
    this.subCategory = this.category?.subCategories.find(
      (y) => categorySelected === y.name
    );

    if (
      this.subCategory &&
      this.subCategory.subCategories &&
      this.subCategory.subCategories.length > 0
    ) {
      this.showSubCategories = true;
    }
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredItems = this.items;
      return;
    }

    this.filteredItems = this.items.filter((itemFiltered) =>
      itemFiltered?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  filterButtons(text: string) {
    if (!text) {
      this.filteredItems = this.items;
      return;
    }

    this.filteredItems = this.items.filter((itemFiltered) =>
      itemFiltered?.categoryName.toLowerCase().includes(text.toLowerCase())
    );
  }

  clearFilter() {
    this.filteredItems = this.items;
  }
}
