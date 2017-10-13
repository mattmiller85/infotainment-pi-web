import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileRemoveComponent } from './tile-remove.component';

describe('TileRemoveComponent', () => {
  let component: TileRemoveComponent;
  let fixture: ComponentFixture<TileRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
