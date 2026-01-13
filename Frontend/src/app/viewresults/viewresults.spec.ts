import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewresults } from './viewresults';

describe('Viewresults', () => {
  let component: Viewresults;
  let fixture: ComponentFixture<Viewresults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewresults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewresults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
