import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationAdmin } from './education-admin';

describe('EducationAdmin', () => {
  let component: EducationAdmin;
  let fixture: ComponentFixture<EducationAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
