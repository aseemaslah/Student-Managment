import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewstudents } from './viewstudents';

describe('Viewstudents', () => {
  let component: Viewstudents;
  let fixture: ComponentFixture<Viewstudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewstudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewstudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
