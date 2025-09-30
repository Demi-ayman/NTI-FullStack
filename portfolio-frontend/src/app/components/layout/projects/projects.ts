import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service/projects.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  projects:any[] =[];
  errorMessage ='';
  constructor(private projectService:ProjectsService){}
  ngOnInit():void{
    this.loadProjects();
  }
  loadProjects():void{
    this.projectService.getAll().subscribe({
      next:(data)=>this.projects=data,
      error:()=>this.errorMessage='Failed to load Projects'
    })
  }
  
}
