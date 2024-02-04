import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavigationButtonComponent } from './category-navigation-button.component';

describe('CategoryNavigationButtonComponent', () => {
  let component: CategoryNavigationButtonComponent;
  let fixture: ComponentFixture<CategoryNavigationButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryNavigationButtonComponent]
    });
    fixture = TestBed.createComponent(CategoryNavigationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
