import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTileComponent } from './add-update-tile.component';

describe('AddUpdateTileComponent', () => {
  let component: AddUpdateTileComponent;
  let fixture: ComponentFixture<AddUpdateTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
