import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteErrorComponent } from './delete-error.component';

describe('DeleteErrorComponent', () => {
  let component: DeleteErrorComponent;
  let fixture: ComponentFixture<DeleteErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
