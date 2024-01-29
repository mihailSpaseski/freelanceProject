import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterLink, RouterLinkActive } from "@angular/router";



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink
  ],
  exports: [
    NavbarComponent
  ],
  bootstrap: [NavbarComponent]
})
export class SharedModule { }
