import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addteacher } from './addteacher';

describe('Addteacher', () => {
  let component: Addteacher;
  let fixture: ComponentFixture<Addteacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addteacher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addteacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
