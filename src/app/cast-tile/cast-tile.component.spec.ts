import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastTileComponent } from './cast-tile.component';

describe('CastTileComponent', () => {
  let component: CastTileComponent;
  let fixture: ComponentFixture<CastTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
