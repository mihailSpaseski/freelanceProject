import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  signInWithEmailPassword() {
    throw new Error('Method not implemented.');
  }

  constructor(private afs: AngularFireAuth) { }

  signInWithGoogle(){
    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }

  registerWithEmailPassword(user: {email:string, password:string}){
    return this.afs.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginWithEmailPassword(user: {email:string, password:string}){
    return this.afs.signInWithEmailAndPassword(user.email, user.password);
  }
}
