import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { ProjectsService } from '../../../core/services/projects.service/projects.service';

@Component({
  selector: 'app-projects-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './projects-admin.html',
  styleUrl: './projects-admin.css'
})
export class ProjectsAdmin implements OnInit  {
  projects:any[] = [];
  newProject:any ={ category: '', projectName: '', desc: '', github: '' };
  errorMessage = '';

  constructor(private projectService:ProjectsService){}


  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects():void{
    this.projectService.getAll().subscribe({
      next:(data)=> this.projects = data,
      error:()=>this.errorMessage='Failed to load projects'
    })
  }

  addProject():void{
    this.projectService.create(this.newProject).subscribe({
      next:(data)=>{
        this.projects.push(data[0] || data); // depending on insertMany vs single insert
        this.newProject = { category: '', projectName: '', desc: '', github: '' };
      },
      error:()=>this.errorMessage ='Failed to add project'
    })
  }

  updateProject(id:string):void{
    const project = this.projects.find(p=>p._id === id);
    this.projectService.update(id,project).subscribe({
      next:(data)=>console.log('Updated',data),
      error:()=>this.errorMessage ='Failed to update project'
    })
  }
  deleteProject(id:string):void{
    if (!confirm('Are you sure you want to delete this project?')) return;
    this.projectService.delete(id).subscribe({
      next:()=>this.projects = this.projects.filter(p=>p._id!==id),
      error:()=>this.errorMessage='Failed to delete project'
    })
  }

}
