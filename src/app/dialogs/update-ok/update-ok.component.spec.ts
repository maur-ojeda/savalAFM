import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOkComponent } from './update-ok.component';

describe('UpdateOkComponent', () => {
  let component: UpdateOkComponent;
  let fixture: ComponentFixture<UpdateOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
