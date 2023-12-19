import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fieldsDisabled = false; // Initially enabled

  disableFields() {
    this.fieldsDisabled = !this.fieldsDisabled; // Toggle state
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  registerWithEmailPassword(){
    console.log(this.loginForm.value);
    const userData = Object.assign(this.loginForm.value, { email: this.loginForm.value.username });

    this.authenticationService.registerWithEmailPassword(userData).then((res: any) => {
      this.router.navigateByUrl('home')
    }).catch((err: any) => {
      console.error(err);
    })
  }
}
