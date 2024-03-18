import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environment/environment';
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { PagesModule } from "./pages/pages.module";
import { SharedModule } from "./shared/shared.module";
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    PagesModule,
    SharedModule,
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyCSDrOmWXOAKB74JDbOZhQqvRLf4ZlWXgk'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
