import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fixedassetcreate6Component } from './fixedassetcreate6.component';

describe('Fixedassetcreate6Component', () => {
  let component: Fixedassetcreate6Component;
  let fixture: ComponentFixture<Fixedassetcreate6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fixedassetcreate6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fixedassetcreate6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
