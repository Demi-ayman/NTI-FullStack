import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillsService } from '../../../core/services/skills.service/skills.service';

@Component({
  selector: 'app-skills-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './skills-admin.html',
  styleUrl: './skills-admin.css'
})
export class SkillsAdmin {
  skills:any[] = [];
  errorMessage = '';
  newSkill={name:'',level:''};
  editSkillId:string|null = null;
  editSkillData={name:'',level:''};

  constructor(private skillService:SkillsService){}

  ngOnInit():void{
    this.loadSkills();
  }
  loadSkills():void{
    this.skillService.getAll().subscribe({
      next:(data)=>this.skills= data,
      error:()=>this.errorMessage='Failed t load skills'
    })
  }

  addSkills():void{
    if(!this.newSkill.name || !this.newSkill.level)return ;
    this.skillService.create(this.newSkill).subscribe({
      next:(skill)=>{
        this.skills.push(skill[0] || skill);
        this.newSkill={name:'',level:''};
      },
      error:()=>this.errorMessage='Failed to add skill'
    });
  }

  startEdit(skill:any):void{
    this.editSkillId=skill._id;
    this.editSkillData={name:skill.name,level:skill.level};
  }

  updateSkill():void{
    if(!this.editSkillId)return;
    this.skillService.update(this.editSkillId,this.editSkillData).subscribe({
      next:(updated)=>{
        const index = this.skills.findIndex(s=>s._id === this.editSkillId);
        if(index>-1) this.skills[index]=updated;
        this.cancelEdit();
      },
      error:()=>this.errorMessage='Failed to update skill'
    })
  }
  cancelEdit():void{
    this.editSkillId=null;
    this.editSkillData={name:'',level:''}
  }
  deleteSkill(id:string):void{
    if(!confirm('Are you sure you want to delete this skill?'))return;
    this.skillService.delete(id).subscribe({
      next:()=>this.skills=this.skills.filter(s=>s._id !==id),
      error:()=>this.errorMessage='Failed to delete skill'
    })
  }


}
