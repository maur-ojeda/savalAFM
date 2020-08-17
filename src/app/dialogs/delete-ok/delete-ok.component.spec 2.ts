import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOkComponent } from './delete-ok.component';

describe('DeleteOkComponent', () => {
  let component: DeleteOkComponent;
  let fixture: ComponentFixture<DeleteOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
