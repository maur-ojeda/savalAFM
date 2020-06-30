import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedassetlistComponent } from './fixedassetlist.component';

describe('FixedassetlistComponent', () => {
  let component: FixedassetlistComponent;
  let fixture: ComponentFixture<FixedassetlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedassetlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedassetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
