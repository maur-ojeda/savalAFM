import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedassetmoveComponent } from './fixedassetmove.component';

describe('FixedassetmoveComponent', () => {
  let component: FixedassetmoveComponent;
  let fixture: ComponentFixture<FixedassetmoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedassetmoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedassetmoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
