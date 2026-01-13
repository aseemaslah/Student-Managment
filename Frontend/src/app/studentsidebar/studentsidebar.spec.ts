import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentsidebar } from './studentsidebar';

describe('Studentsidebar', () => {
  let component: Studentsidebar;
  let fixture: ComponentFixture<Studentsidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studentsidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentsidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
