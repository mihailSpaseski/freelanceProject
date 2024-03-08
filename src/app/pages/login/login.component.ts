import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  template: `
    <div *ngIf="auth.user | async as user; else showLogin">
      <h1>Hello {{ user.displayName }}!</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #showLogin>
      <p>Please login.</p>
      <button (click)="login()">Login with Google</button>
    </ng-template>
  `,
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  passwordControl: FormControl = new FormControl('', [Validators.required]);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  loginWithEmailPassword() {
    const userData = Object.assign(this.loginForm.value, {
      email: this.loginForm.value.username,
    });

    this.authService
      .loginWithEmailPassword(userData)
      .then(() => {
        window.alert('Login Successful');

        this.router.navigateByUrl('home').then(() => window.location.reload());
      })
      .catch((err: any) => {
        console.error(err);
        window.alert('An error has occured: ' + err);
      });
  }

  loginWithGoogle() {
    console.log('LOGIN WITH GOOGLE');
  }
}
