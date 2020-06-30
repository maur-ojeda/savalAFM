import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fixedassetcreate3Component } from './fixedassetcreate3.component';

describe('Fixedassetcreate3Component', () => {
  let component: Fixedassetcreate3Component;
  let fixture: ComponentFixture<Fixedassetcreate3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fixedassetcreate3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fixedassetcreate3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
