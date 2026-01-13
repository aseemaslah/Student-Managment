import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entermarks } from './entermarks';

describe('Entermarks', () => {
  let component: Entermarks;
  let fixture: ComponentFixture<Entermarks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entermarks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Entermarks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
