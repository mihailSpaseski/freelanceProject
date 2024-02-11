import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  companyRegisterForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    fullName: new FormControl('', [Validators.required]),
    enterCountry: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumberWithAreaCode: new FormControl('', [Validators.required]),
    productWantToBuy: new FormControl('', [Validators.required])
  })

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {

  }


  registerWithEmailPassword() {

    const userData = Object.assign(this.registerForm.value, { email: this.registerForm.value.username });

    this.authService.registerWithEmailPassword(userData).then((res: any) => {
      this.router.navigate(['/login']);
      this.afAuth.signOut();
      window.alert('Registration successful, please login');
    }).catch((err: any) => {
      console.error(err);
      window.alert('Error has occured: ' + err);
    })
  }
}