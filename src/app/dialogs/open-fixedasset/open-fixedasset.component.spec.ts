import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFixedassetComponent } from './open-fixedasset.component';

describe('OpenFixedassetComponent', () => {
  let component: OpenFixedassetComponent;
  let fixture: ComponentFixture<OpenFixedassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenFixedassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenFixedassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
