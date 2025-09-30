import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EducationService } from '../../../core/services/education.service/education.service';

@Component({
  selector: 'app-education-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './education-admin.html',
  styleUrl: './education-admin.css'
})
export class EducationAdmin {
  educations:any[]= [];
  newEducation:any = {
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    grade: ''
  };
  constructor(private educationService : EducationService){}
  ngOnInit():void{
    this.loadEducation();
  }
  loadEducation():void{
    this.educationService.getAll().subscribe({
      next:(res)=>this.educations = res,
      error:(err)=>console.error('Error Fetching Education',err)
    });
  }
  addEducation(): void {
  const eduToAdd = { ...this.newEducation };
  delete eduToAdd._id; 

    this.educationService.create(eduToAdd).subscribe({
      next: (res) => {
        this.educations.push(res);
        this.newEducation = {
          institution: '',
          degree: '',
          field: '',
          startYear: '',
          endYear: '',
          grade: ''
        };
      },
      error: (err: any) => console.error('Error Creating Education', err)
    });
  }
  deleteEducation(id:string):void{
    this.educationService.delete(id).subscribe({
      next: () => {
        this.educations = this.educations.filter(e => e._id !== id);
      },
      error:(err)=>console.error('Error Deleting Education',err)
    });
  }
}
