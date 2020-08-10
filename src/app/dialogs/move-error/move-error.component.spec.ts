import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveErrorComponent } from './move-error.component';

describe('MoveErrorComponent', () => {
  let component: MoveErrorComponent;
  let fixture: ComponentFixture<MoveErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
