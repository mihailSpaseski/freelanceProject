import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FoodComponent } from './home/categories/food/food.component';
import { TourismComponent } from './home/categories/tourism/tourism.component';
import { HrComponent } from './home/categories/hr/hr.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutusComponent,
    HomeComponent,
    ContactUsComponent,
    LoginComponent,
    NotFoundComponent,
    FoodComponent,
    TourismComponent,
    HrComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCSDrOmWXOAKB74JDbOZhQqvRLf4ZlWXgk",
      authDomain: "sellerworld-455be.firebaseapp.com",
      projectId: "sellerworld-455be",
      storageBucket: "sellerworld-455be.appspot.com",
      messagingSenderId: "330933858571",
      appId: "1:330933858571:web:8020c06543ddbb7719f20e",
      measurementId: "G-2KW5Y81LYB"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent, AboutusComponent]
})
export class AppModule { }
