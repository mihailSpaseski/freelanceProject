import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  // auth = getAuth();
  // const user = auth.currentUser;

  constructor(
    public afAuth: AngularFireAuth,
  ) {}
}
