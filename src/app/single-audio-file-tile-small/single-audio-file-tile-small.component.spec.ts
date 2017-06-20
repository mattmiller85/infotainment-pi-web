import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAudioFileTileSmallComponent } from './single-audio-file-tile-small.component';

describe('SingleAudioFileTileSmallComponent', () => {
  let component: SingleAudioFileTileSmallComponent;
  let fixture: ComponentFixture<SingleAudioFileTileSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAudioFileTileSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAudioFileTileSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
