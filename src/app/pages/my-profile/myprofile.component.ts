import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
})
export class MyprofileComponent {
  constructor(private afAuth: AngularFireAuth) {}

  async logOut() {
    await this.afAuth.signOut().then(() => {
      window.alert('Logged out!');
      localStorage.clear();
      window.location.reload();
    });
  }
}
