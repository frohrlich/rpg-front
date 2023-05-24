import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccrocheComponent } from './accroche.component';

describe('AccrocheComponent', () => {
  let component: AccrocheComponent;
  let fixture: ComponentFixture<AccrocheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccrocheComponent]
    });
    fixture = TestBed.createComponent(AccrocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
