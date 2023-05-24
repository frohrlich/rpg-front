import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoboxComponent } from './logobox.component';

describe('LogoboxComponent', () => {
  let component: LogoboxComponent;
  let fixture: ComponentFixture<LogoboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoboxComponent]
    });
    fixture = TestBed.createComponent(LogoboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
