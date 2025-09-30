import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutService } from './about.service';

describe('AboutService', () => {
  let component: AboutService;
  let fixture: ComponentFixture<AboutService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
