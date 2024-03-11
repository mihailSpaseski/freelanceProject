import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryNavigationButtonComponent } from './components/category-navigation-button/category-navigation-button.component';
import { ToastComponent } from './toast/toast.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CategoryNavigationButtonComponent,
    ToastComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterLinkActive, RouterLink],
  exports: [NavbarComponent, CategoryNavigationButtonComponent, FooterComponent ],
  bootstrap: [NavbarComponent],
})
export class SharedModule {}
