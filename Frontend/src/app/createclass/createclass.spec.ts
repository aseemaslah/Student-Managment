import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createclass } from './createclass';

describe('Createclass', () => {
  let component: Createclass;
  let fixture: ComponentFixture<Createclass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createclass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createclass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
