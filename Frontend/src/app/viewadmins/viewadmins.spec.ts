import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewadmins } from './viewadmins';

describe('Viewadmins', () => {
  let component: Viewadmins;
  let fixture: ComponentFixture<Viewadmins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewadmins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewadmins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
