import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { FoodComponent } from './home/categories/food/food.component';
import { HrComponent } from './home/categories/hr/hr.component';
import { TourismComponent } from './home/categories/tourism/tourism.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about-us', component: AboutusComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'login-register', component: LoginComponent },
    { path: 'food', component: FoodComponent},
    { path: 'human-resources', component: HrComponent},
    { path: 'tourism', component: TourismComponent},
    { path: '**', component: NotFoundComponent },
    { path: '404', component: NotFoundComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
