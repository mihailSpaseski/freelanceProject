import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { Category } from "../shared/models/category";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  categoriesRef: AngularFireList<Category>;
  categoriesUrl = '/categories';


  constructor(private database: AngularFireDatabase) {
    this.categoriesRef = database.list(this.categoriesUrl);
  }


  createCategory(value: any) {
    this.categoriesRef.push(value);
  }

  getCategories() {
    return this.categoriesRef;
  }

  getCategoriesList(): Observable<any[]> {
    return this.getCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }

  updateCategory(key: string, value: any) {
    return this.categoriesRef.update(key, value);
  }

  deleteCategory(key: string): Promise<any> {
    return this.categoriesRef.remove(key);
  }
}
