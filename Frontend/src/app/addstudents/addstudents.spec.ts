import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addstudents } from './addstudents';

describe('Addstudents', () => {
  let component: Addstudents;
  let fixture: ComponentFixture<Addstudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addstudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addstudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
