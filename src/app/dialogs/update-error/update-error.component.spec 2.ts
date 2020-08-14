import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateErrorComponent } from './update-error.component';

describe('UpdateErrorComponent', () => {
  let component: UpdateErrorComponent;
  let fixture: ComponentFixture<UpdateErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
