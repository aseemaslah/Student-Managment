import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teachersidebar } from './teachersidebar';

describe('Teachersidebar', () => {
  let component: Teachersidebar;
  let fixture: ComponentFixture<Teachersidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Teachersidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Teachersidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
