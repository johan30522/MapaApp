import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomRanmgeComponent } from './zoom-ranmge.component';

describe('ZoomRanmgeComponent', () => {
  let component: ZoomRanmgeComponent;
  let fixture: ComponentFixture<ZoomRanmgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomRanmgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomRanmgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
