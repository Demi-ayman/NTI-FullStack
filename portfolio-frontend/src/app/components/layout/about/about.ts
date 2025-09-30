import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../../core/services/about.service/about.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit{
  aboutList:any[]=[];
  errorMessage ='';

  constructor(private aboutService:AboutService){}
  ngOnInit(): void {
    this.loadAbout();
  }
  loadAbout():void{
    this.aboutService.getAll().subscribe({
      next:(data)=>this.aboutList = data,
      error:()=>this.errorMessage = 'Failed to load about information'
    });
  }
  

}
