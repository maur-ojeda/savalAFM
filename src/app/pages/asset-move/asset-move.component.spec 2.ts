import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMoveComponent } from './asset-move.component';

describe('AssetMoveComponent', () => {
  let component: AssetMoveComponent;
  let fixture: ComponentFixture<AssetMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
