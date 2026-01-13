import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Markattendance } from './markattendance';

describe('Markattendance', () => {
  let component: Markattendance;
  let fixture: ComponentFixture<Markattendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Markattendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Markattendance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
