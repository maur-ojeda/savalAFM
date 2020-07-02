import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetPendingComponent } from './fixed-asset-pending.component';

describe('FixedAssetPendingComponent', () => {
  let component: FixedAssetPendingComponent;
  let fixture: ComponentFixture<FixedAssetPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
