import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { countries } from 'src/app/shared/country-data-store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  // public : any = this.countries

  public countries: any = countries;
  private selected:any;

  companyType: number = 1;

  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator })

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true };
  }

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
    private afAuth: AngularFireAuth,
    private firebase: FirebaseService
  ) { }

  ngOnInit(): void {

  }

  // addProduct() {
  //   if (this.productForm.valid) {
  //     const productBody = {
  //       ...this.productForm.value
  //     }
  //     this.firebase.createProduct(this.productForm.value);
  //   } else {
  //     window.alert('Not Valid');
  //     console.log('Not Valid');
  //   }
  // }

  get registerFormControls() {
    return this.registerForm.controls;
  }


  registerWithEmailPassword() {

    const userData = Object.assign(this.registerForm.value, { email: this.registerForm.value.username });

    if (this.registerForm.valid) {
      this.authService.registerWithEmailPassword(userData).then((res: any) => {
        this.router.navigate(['/login']);
        this.afAuth.signOut(); 
        // this.firebase.createUser(userData);
        // console.log(this.firebase.createUser(this.registerForm.value))
        // console.log()
        window.alert('Registration successful, please login');
      }).catch((err: any) => {
        console.error(err);
        window.alert('Error has occured: ' + err);
      })
    } else {
      window.alert('Form Invalid')
    }

  }

  printCountry() {
    console.log('You picked: ', this.selected)
  }
}