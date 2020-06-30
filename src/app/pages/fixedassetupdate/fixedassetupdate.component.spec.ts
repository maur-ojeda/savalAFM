import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedassetupdateComponent } from './fixedassetupdate.component';

describe('FixedassetupdateComponent', () => {
  let component: FixedassetupdateComponent;
  let fixture: ComponentFixture<FixedassetupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedassetupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedassetupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
