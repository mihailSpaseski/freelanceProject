import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Product } from '../shared/models/proudctsModel';
import { User } from '../shared/models/users';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  productsRef: AngularFireList<Product>;
  productsUrl = '/products';
  usersUrl = '/users';

  // userbyid = firebase.database().ref('/users');
  // userbyid = firebase.ref('/users');

  usersRef: AngularFireList<any>;
  // userUrl = '/users';

  constructor(private database: AngularFireDatabase) {
    this.productsRef = database.list(this.productsUrl);
    this.usersRef = database.list(this.usersUrl);
  }

  // createUser(value: any): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.usersRef.push(value);
  //     resolve(true);
  //   });
  // }

  createUser(value: any) {
    this.usersRef.push(value);
  }

  getUser() {
    return this.usersRef;
  }

  updateUser(key: string, value: any) {
    return this.usersRef.update(key, value);
  }

  // getUsersbyId(id: any): Promise<User> {
  //   return new Promise((resolve, reject) => {

  //     console.log()

  //     // this.userbyid.child(id).once('value', snapshot => {
  //     //   resolve(snapshot.val());
  //     // });
  //   });
  // }

  createProduct(value: any) {
    this.productsRef.push(value);
  }

  getProducts() {
    return this.productsRef;
  }

  getProductsList(): Observable<Product[]> {
    // @ts-ignore
    return this.getProducts()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
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
