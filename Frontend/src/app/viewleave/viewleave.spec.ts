import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewleave } from './viewleave';

describe('Viewleave', () => {
  let component: Viewleave;
  let fixture: ComponentFixture<Viewleave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewleave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewleave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
