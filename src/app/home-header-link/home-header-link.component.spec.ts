import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderLinkComponent } from './home-header-link.component';

describe('HomeHeaderLinkComponent', () => {
  let component: HomeHeaderLinkComponent;
  let fixture: ComponentFixture<HomeHeaderLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHeaderLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeaderLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
