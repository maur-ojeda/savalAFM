import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveOkComponent } from './move-ok.component';

describe('MoveOkComponent', () => {
  let component: MoveOkComponent;
  let fixture: ComponentFixture<MoveOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
