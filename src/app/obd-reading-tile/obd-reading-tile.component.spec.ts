import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObdReadingTileComponent } from './obd-reading-tile.component';

describe('ObdReadingTileComponent', () => {
  let component: ObdReadingTileComponent;
  let fixture: ComponentFixture<ObdReadingTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObdReadingTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObdReadingTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
