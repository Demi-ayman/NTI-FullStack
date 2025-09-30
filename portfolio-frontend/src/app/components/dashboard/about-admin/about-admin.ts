import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutService } from '../../../core/services/about.service/about.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './about-admin.html',
  styleUrl: './about-admin.css'
})
export class AboutAdmin {
  aboutList:any[]=[];
  errorMessage ='';
  editAbout:any=null;

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

  startEdit(about: any) {
    this.editAbout = { ...about };
  }

  saveEdit() {
    if (!this.editAbout) return;

    this.aboutService.update(this.editAbout._id, this.editAbout).subscribe({
      next: (res) => {
        this.loadAbout();
        this.editAbout = null;
      },
      error: () => this.errorMessage = 'Failed to update about info'
    });
  }
  cancelEdit() {
    this.editAbout = null;
  }

onFileSelected(event: any) {
  if (!this.editAbout) {
    this.errorMessage = 'Please click Edit before uploading an image';
    return;
  }

  const file = event.target.files[0];
  if (!file) return;

  this.aboutService.uploadImage(file).subscribe({
    next: (data) => {
      console.log('Uploaded image URL:', data.imageUrl);
      // Assign uploaded URL to current edit object
      this.editAbout.image = data.imageUrl;
    },
    error: () => this.errorMessage = 'Image upload failed'
  });
}

}
