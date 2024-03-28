import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product } from '../shared/models/proudctsModel';
import { FileUpload } from '../shared/models/fileUpload';
import firebase from 'firebase/compat/app';
import { User } from '../shared/models/users';
import { newsModel } from '../shared/models/newsModel';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  productsRef: AngularFireList<Product>;
  usersRef: AngularFireList<any>;
  newsRef: AngularFireList<any>;
  companyRef: AngularFireList<any>;

  productsUrl = '/products';
  usersUrl = '/users';
  newsUrl = '/news';
  companyUrl = '/company';
  private basePath = '/uploads';
  private newsPath = '/news';

  constructor(
    private database: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.productsRef = database.list(this.productsUrl);
    this.usersRef = database.list(this.usersUrl);
    this.newsRef = database.list(this.newsUrl);
    this.companyRef = database.list(this.companyUrl);
  }

  createUser(value: any) {
    this.usersRef.push(value);
  }

  createCompany(value: any) {
    this.companyRef.push(value);
  }

  getUser() {
    return this.usersRef;
  }

  getNews() {
    return this.newsRef;
  }

  updateUser(key: string, value: any) {
    return this.usersRef.update(key, value);
  }

  createProduct(value: any) {
    this.productsRef.push(value);
  }

  createNewsArticle(value: any) {
    this.newsRef.push(value);
  }

  getProducts() {
    return this.productsRef;
  }

  getProductID() {
    // @ts-ignore
    return this.getProducts()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
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

  getUsersList(): Observable<User[]> {
    // @ts-ignore
    return this.getUser()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getNewsList(): Observable<newsModel[]> {
    // @ts-ignore
    return this.getNews()
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

  pushFileToStorage(
    fileUpload: FileUpload,
    product: any
  ): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            product.image = downloadURL;
            this.createProduct(product);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }

  pushNewsToStorage(
    fileUpload: FileUpload,
    article: any
  ): Observable<number | undefined> {
    const filePath = `${this.newsPath}/${fileUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            article.image = downloadURL;
            this.createNewsArticle(article);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(firebase.auth().currentUser);
    });
  }

  getCurrentUserUID(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(firebase.auth().currentUser!.uid);
    });
  }
}
