import { Component } from '@angular/core';
import { EducationService } from '../../../core/services/education.service/education.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education {
  educations: any[] =[];
  constructor(private educationServices:EducationService){}
  ngOnInit():void{
    this.educationServices.getAll().subscribe({
      next:(res)=>{
        this.educations = res;
        console.log('Education Data',res);
      },
      error:(err)=>{
        console.error('Error Fetching Education',err);
      }
    })
  }
}
