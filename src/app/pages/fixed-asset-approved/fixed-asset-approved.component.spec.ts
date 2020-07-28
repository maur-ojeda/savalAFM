import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetApprovedComponent } from './fixed-asset-approved.component';

describe('FixedAssetApprovedComponent', () => {
  let component: FixedAssetApprovedComponent;
  let fixture: ComponentFixture<FixedAssetApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
