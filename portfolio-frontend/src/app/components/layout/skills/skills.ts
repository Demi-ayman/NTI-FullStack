import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../core/services/skills.service/skills.service';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit {
  skills: any[] = [];
  errorMessage = '';

  constructor(private skillService:SkillsService){}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills():void{
    this.skillService.getAll().subscribe({
      next:(data)=>this.skills=data,
      error:(err)=>this.errorMessage='Failed to load skills'
    })
  };

  // deleteSkill(id:string){
  //   if(!confirm('Are you sure you want to delete this skill?')) return ;
  //   this.skillService.delete(id).subscribe({
  //     next:()=> this.skills = this.skills.filter(c=> c._id !== id),
  //     error:(err)=>this.errorMessage='Failed to delete skill'
  //   });
  // }
}
