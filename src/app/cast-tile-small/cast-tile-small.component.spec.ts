import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastTileSmallComponent } from './cast-tile-small.component';

describe('CastTileSmallComponent', () => {
  let component: CastTileSmallComponent;
  let fixture: ComponentFixture<CastTileSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastTileSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastTileSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
