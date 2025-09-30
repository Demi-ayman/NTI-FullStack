import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  let component: SkillsService;
  let fixture: ComponentFixture<SkillsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
