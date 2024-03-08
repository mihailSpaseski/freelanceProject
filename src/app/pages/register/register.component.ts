import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { countries } from 'src/app/shared/country-data-store';
import { User } from 'src/app/shared/models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fieldTextType: boolean = false;

  companyRegisterForm: FormGroup = new FormGroup({});
  currentPage: number = 1;

  public countries: any = countries;
  private selected: any;

  userSelected: boolean = false;
  companySelected: boolean = false;

  companyType: number = 1;

  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firebaseSer: FirebaseService,
  ) {}

  registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
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

  // companyRegisterForm: FormGroup = new FormGroup(
  //   {
  //     category: new FormControl(['food', Validators.required]),
  //     companyName: new FormControl(['', Validators.required]),
  //     companyEmail: new FormControl([
  //       '',
  //       [Validators.required, Validators.email],
  //     ]),
  //     password: new FormControl(['', Validators.required]),
  //     confirmPassword: new FormControl(['', Validators.required]),
  //     buyerSeller: new FormControl(['', Validators.required]),
  //     buyerIntention: new FormControl(['']),
  //     sellerIntention: new FormControl(['']),
  //   },
  //   { validators: this.passwordMatchValidator }
  // );

  ngOnInit(): void {
    this.companyRegisterForm = this.fb.group(
      {
        category: ['food', Validators.required],
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
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  registerWithEmailPassword() {
    const { username, email, password, phoneNumber } = this.registerForm.value;

    if (!this.registerForm.valid || !username || !password || !email) {
      return;
    }

    if (this.registerForm.valid) {
      this.authService
        .registerWithEmailPassword({ email, password })
        .then((res: any) => {
            const key = res.user.uid
            this.firebaseSer.createUser({ key, email, username, phoneNumber });

            window.alert('Registration successful, please login');
            
            this.afAuth.signOut();
            this.router.navigate(['/login']);
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
    console.log('this.registrationForm.value');
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  showUserCard() {
    this.userSelected = true;
    this.companySelected = false;
  }

  showCompanyCard() {
    this.userSelected = false;
    this.companySelected = true;
  }
}
