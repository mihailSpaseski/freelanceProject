import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FoodComponent } from './home/categories/food/food.component';
import { TourismComponent } from './home/categories/tourism/tourism.component';
import { HrComponent } from './home/categories/hr/hr.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RegisterComponent } from './register/register.component';
import { environment } from 'src/environment/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MarketingComponent } from './home/marketing/marketing.component';
import { EventsComponent } from './home/events/events.component';
import { NewsComponent } from './home/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    FoodComponent,
    TourismComponent,
    HrComponent,
    RegisterComponent,
    MarketingComponent,
    EventsComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
