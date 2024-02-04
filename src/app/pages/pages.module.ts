import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesModule } from "./home/categories/categories.module";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MyprofileComponent } from "./my-profile/myprofile.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { EventsComponent } from "./home/events/events.component";
import { MarketingComponent } from "./home/marketing/marketing.component";
import { NewsComponent } from "./home/news/news.component";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    MyprofileComponent,
    RegisterComponent,
    NotFoundComponent,
    EventsComponent,
    MarketingComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    CategoriesModule,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    SharedModule,
  ],
   exports: [
     HomeComponent,
     LoginComponent,
     MyprofileComponent,
     RegisterComponent,
     NotFoundComponent,
     EventsComponent,
     MarketingComponent,
     NewsComponent
   ]
})
export class PagesModule { }
