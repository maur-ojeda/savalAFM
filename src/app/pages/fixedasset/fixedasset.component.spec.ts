import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedassetComponent } from './fixedasset.component';

describe('FixedassetComponent', () => {
  let component: FixedassetComponent;
  let fixture: ComponentFixture<FixedassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
