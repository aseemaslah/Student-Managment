import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewteachers } from './viewteachers';

describe('Viewteachers', () => {
  let component: Viewteachers;
  let fixture: ComponentFixture<Viewteachers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewteachers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewteachers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
