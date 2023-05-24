import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenshotsComponent } from './screenshots.component';

describe('ScreenshotsComponent', () => {
  let component: ScreenshotsComponent;
  let fixture: ComponentFixture<ScreenshotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenshotsComponent]
    });
    fixture = TestBed.createComponent(ScreenshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
