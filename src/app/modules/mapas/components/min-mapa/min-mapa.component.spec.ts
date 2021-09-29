import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMapaComponent } from './min-mapa.component';

describe('MinMapaComponent', () => {
  let component: MinMapaComponent;
  let fixture: ComponentFixture<MinMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
