import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedassetcreateComponent } from './fixedassetcreate.component';

describe('FixedassetcreateComponent', () => {
  let component: FixedassetcreateComponent;
  let fixture: ComponentFixture<FixedassetcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedassetcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedassetcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
