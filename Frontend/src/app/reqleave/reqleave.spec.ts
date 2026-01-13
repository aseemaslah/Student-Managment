import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reqleave } from './reqleave';

describe('Reqleave', () => {
  let component: Reqleave;
  let fixture: ComponentFixture<Reqleave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reqleave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reqleave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
