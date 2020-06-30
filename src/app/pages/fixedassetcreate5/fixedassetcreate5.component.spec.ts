import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fixedassetcreate5Component } from './fixedassetcreate5.component';

describe('Fixedassetcreate5Component', () => {
  let component: Fixedassetcreate5Component;
  let fixture: ComponentFixture<Fixedassetcreate5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fixedassetcreate5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fixedassetcreate5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
