import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import {
  AngularFireStorage,
} from '@angular/fire/compat/storage';
import { Product } from '../shared/models/proudctsModel';
import { User } from '../shared/models/users';
import { FileUpload } from '../shared/models/fileUpload';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  productsRef: AngularFireList<Product>;
  productsUrl = '/products';
  usersUrl = '/users';
  private basePath = '/uploads';

  // userbyid = firebase.database().ref('/users');
  // userbyid = firebase.ref('/users');

  usersRef: AngularFireList<any>;
  // userUrl = '/users';

  constructor(private database: AngularFireDatabase,  private storage: AngularFireStorage) {
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

  pushFileToStorage(fileUpload: FileUpload, product: any): Observable<number | undefined> {
    console.log(fileUpload);
  const filePath = `${this.basePath}/${fileUpload.name}`;
  const storageRef = this.storage.ref(filePath);
  const uploadTask = this.storage.upload(filePath, fileUpload);

  uploadTask.snapshotChanges().pipe(
    finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
        product.image = downloadURL;
        console.log('here');
        this.createProduct(product);
      });
    })
  ).subscribe();

  return uploadTask.percentageChanges();
}
}
