import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetClosedComponent } from './fixed-asset-closed.component';

describe('FixedAssetClosedComponent', () => {
  let component: FixedAssetClosedComponent;
  let fixture: ComponentFixture<FixedAssetClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
