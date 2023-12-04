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
    HrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent, AboutusComponent]
})
export class AppModule { }
