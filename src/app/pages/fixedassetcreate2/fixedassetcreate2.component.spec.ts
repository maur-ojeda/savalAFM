import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fixedassetcreate2Component } from './fixedassetcreate2.component';

describe('Fixedassetcreate2Component', () => {
  let component: Fixedassetcreate2Component;
  let fixture: ComponentFixture<Fixedassetcreate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fixedassetcreate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fixedassetcreate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
