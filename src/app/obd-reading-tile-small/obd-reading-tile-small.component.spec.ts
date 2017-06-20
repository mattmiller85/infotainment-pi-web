import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObdReadingTileSmallComponent } from './obd-reading-tile-small.component';

describe('ObdReadingTileSmallComponent', () => {
  let component: ObdReadingTileSmallComponent;
  let fixture: ComponentFixture<ObdReadingTileSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObdReadingTileSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObdReadingTileSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
