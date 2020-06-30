import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fixedassetcreate4Component } from './fixedassetcreate4.component';

describe('Fixedassetcreate4Component', () => {
  let component: Fixedassetcreate4Component;
  let fixture: ComponentFixture<Fixedassetcreate4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fixedassetcreate4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fixedassetcreate4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
