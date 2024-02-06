import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { Category } from "../shared/models/category";
import { Product } from '../shared/models/proudctsModel';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  productsRef: AngularFireList<Product>;
  productsUrl = '/products';


  constructor(private database: AngularFireDatabase) {
    this.productsRef = database.list(this.productsUrl);
  }


  createProduct(value: any) {
    this.productsRef.push(value);
  }

  getProducts() {
    return this.productsRef;
  }

  getProductsList(): Observable<Product[]> {
    // @ts-ignore
    return this.getProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
}

  updateProduct(key: string, value: any) {
    return this.productsRef.update(key, value);
  }

  deleteProduct(key: string): Promise<any> {
    return this.productsRef.remove(key);
  }
}
