import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedassetdeleteComponent } from './fixedassetdelete.component';

describe('FixedassetdeleteComponent', () => {
  let component: FixedassetdeleteComponent;
  let fixture: ComponentFixture<FixedassetdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedassetdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedassetdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
