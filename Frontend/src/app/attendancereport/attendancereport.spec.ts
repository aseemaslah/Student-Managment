import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attendancereport } from './attendancereport';

describe('Attendancereport', () => {
  let component: Attendancereport;
  let fixture: ComponentFixture<Attendancereport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Attendancereport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Attendancereport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
