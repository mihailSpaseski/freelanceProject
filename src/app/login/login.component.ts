import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  hide: boolean = true
  passwordControl: FormControl = new FormControl('', [Validators.required])

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  loginWithEmailPassword() {
    console.log(this.loginForm.value);
    const userData = Object.assign(this.loginForm.value, { email: this.loginForm.value.username });

    this.authenticationService.loginWithEmailPassword(userData).then((res: any) => {
      this.router.navigateByUrl('home')
    }).catch((err: any) => {
      console.error(err);
    })

  }
}
