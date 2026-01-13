import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewattendance } from './viewattendance';

describe('Viewattendance', () => {
  let component: Viewattendance;
  let fixture: ComponentFixture<Viewattendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewattendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewattendance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
