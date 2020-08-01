import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownFixedassetComponent } from './down-fixedasset.component';

describe('DownFixedassetComponent', () => {
  let component: DownFixedassetComponent;
  let fixture: ComponentFixture<DownFixedassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownFixedassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownFixedassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
