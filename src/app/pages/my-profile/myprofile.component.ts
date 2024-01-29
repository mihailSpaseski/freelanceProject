import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {}

  async logOut(){
    await this.afAuth.signOut();
    window.alert('Logged out!');
    this.router.navigate(['/home']);

  }

}
