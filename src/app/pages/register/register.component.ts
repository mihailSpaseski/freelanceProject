import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { countries } from 'src/app/shared/country-data-store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // public : any = this.countries

  fieldTextType: boolean = false;

  currentPage: number = 1;

  public countries: any = countries;
  private selected: any;

  companyType: number = 1;

  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  companyRegisterForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
    ]),
    fullName: new FormControl('', [Validators.required]),
    enterCountry: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumberWithAreaCode: new FormControl('', [Validators.required]),
    productWantToBuy: new FormControl('', [Validators.required]),
  });

  registrationForm: FormGroup = new FormGroup({
    category: new FormControl(['', Validators.required]),
    companyName: new FormControl(['', Validators.required]),
    companyEmail: new FormControl([
      '',
      [Validators.required, Validators.email],
    ]),
    password: new FormControl(['', Validators.required]),
    confirmPassword: new FormControl(['', Validators.required]),
    buyerSeller: new FormControl(['', Validators.required]),
    buyerIntention: new FormControl(['']),
    sellerIntention: new FormControl(['']),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {}

  get registerFormControls() {
    return this.registerForm.controls;
  }

  registerWithEmailPassword() {
    const userData = Object.assign(this.registerForm.value, {
      email: this.registerForm.value.username,
    });

    if (this.registerForm.valid) {
      this.authService
        .registerWithEmailPassword(userData)
        .then((res: any) => {
          this.router.navigate(['/login']);
          this.afAuth.signOut();
          const storedUser ={
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            username: userData.username
          }
          this.firebase.createUser(storedUser);
          window.alert('Registration successful, please login');
        })
        .catch((err: any) => {
          console.error(err);
          window.alert('Error has occured: ' + err);
        });
    } else {
      window.alert('Form Invalid');
    }
  }

  printCountry() {
    console.log('You picked: ', this.selected);
  }

  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    this.currentPage--;
  }

  submitForm() {
    if (this.registrationForm.valid) {
      // Handle form submission
      console.log(this.registrationForm.value);
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
