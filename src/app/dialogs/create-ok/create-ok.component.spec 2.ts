import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOkComponent } from './create-ok.component';

describe('CreateOkComponent', () => {
  let component: CreateOkComponent;
  let fixture: ComponentFixture<CreateOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
