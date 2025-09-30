import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let component: ProjectsService;
  let fixture: ComponentFixture<ProjectsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
