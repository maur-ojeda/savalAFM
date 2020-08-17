import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRegisterComponent } from './no-register.component';

describe('NoRegisterComponent', () => {
  let component: NoRegisterComponent;
  let fixture: ComponentFixture<NoRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
