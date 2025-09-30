import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationService } from './education.service';

describe('EducationService', () => {
  let component: EducationService;
  let fixture: ComponentFixture<EducationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
