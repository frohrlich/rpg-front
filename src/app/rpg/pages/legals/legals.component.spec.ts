import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalsComponent } from './legals.component';

describe('LegalsComponent', () => {
  let component: LegalsComponent;
  let fixture: ComponentFixture<LegalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalsComponent]
    });
    fixture = TestBed.createComponent(LegalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
