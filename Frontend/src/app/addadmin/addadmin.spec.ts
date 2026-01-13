import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addadmin } from './addadmin';

describe('Addadmin', () => {
  let component: Addadmin;
  let fixture: ComponentFixture<Addadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
