import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { MarketingComponent } from './pages/home/marketing/marketing.component';
import { EventsComponent } from './pages/home/events/events.component';
import { NewsComponent } from './pages/home/news/news.component';
import { MyprofileComponent } from './pages/my-profile/myprofile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'categories', loadChildren: () => import('../app/pages/home/categories/categories.module')
      .then(mod => mod.CategoriesModule)
  },
  {path: 'register', component: RegisterComponent},
  {path: 'marketing', component: MarketingComponent},
  {path: 'events', component: EventsComponent},
  {path: 'news', component: NewsComponent},
  {path: 'my_profile', component: MyprofileComponent},
  {path: '**', component: NotFoundComponent},
  {path: '404', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
