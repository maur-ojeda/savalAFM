import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetRejectedComponent } from './fixed-asset-rejected.component';

describe('FixedAssetRejectedComponent', () => {
  let component: FixedAssetRejectedComponent;
  let fixture: ComponentFixture<FixedAssetRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
