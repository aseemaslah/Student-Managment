import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assignteacher } from './assignteacher';

describe('Assignteacher', () => {
  let component: Assignteacher;
  let fixture: ComponentFixture<Assignteacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assignteacher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assignteacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
