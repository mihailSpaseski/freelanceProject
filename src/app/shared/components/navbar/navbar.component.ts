import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../models/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  displayName: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firebaseSer: FirebaseService
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      const currentlyLoggedIn = user?.uid;

      this.firebaseSer.getUsersList().subscribe((res: User[]) => {
        const getUserID = res;

        const userAndProductsKey = getUserID.find(
          (x: { key: string | undefined }) => x.key === currentlyLoggedIn
        );

        if (userAndProductsKey) {
          this.displayName = userAndProductsKey.username;
        }
      });
    });
  }
}
