import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FoodComponent } from './home/categories/food/food.component';
import { HrComponent } from './home/categories/hr/hr.component';
import { TourismComponent } from './home/categories/tourism/tourism.component';
import { RegisterComponent } from './register/register.component';
import { MarketingComponent } from './home/marketing/marketing.component';
import { EventsComponent } from './home/events/events.component';
import { NewsComponent } from './home/news/news.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'food', component: FoodComponent},
    { path: 'human-resources', component: HrComponent},
    { path: 'tourism', component: TourismComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'marketing', component: MarketingComponent },
    { path: 'events', component: EventsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'my_profile', component: MyprofileComponent },
    { path: '**', component: NotFoundComponent },
    { path: '404', component: NotFoundComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
