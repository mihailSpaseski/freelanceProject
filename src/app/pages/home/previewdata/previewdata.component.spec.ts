import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewdataComponent } from './previewdata.component';

describe('PreviewdataComponent', () => {
  let component: PreviewdataComponent;
  let fixture: ComponentFixture<PreviewdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewdataComponent]
    });
    fixture = TestBed.createComponent(PreviewdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
