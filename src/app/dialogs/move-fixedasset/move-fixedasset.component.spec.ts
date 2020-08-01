import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveFixedassetComponent } from './move-fixedasset.component';

describe('MoveFixedassetComponent', () => {
  let component: MoveFixedassetComponent;
  let fixture: ComponentFixture<MoveFixedassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveFixedassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveFixedassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
