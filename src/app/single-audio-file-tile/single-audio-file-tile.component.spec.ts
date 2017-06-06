import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAudioFileTileComponent } from './single-audio-file-tile.component';

describe('SingleAudioFileTileComponent', () => {
  let component: SingleAudioFileTileComponent;
  let fixture: ComponentFixture<SingleAudioFileTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAudioFileTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAudioFileTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
