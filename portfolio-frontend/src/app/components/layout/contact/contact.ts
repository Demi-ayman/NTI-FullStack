import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service/contact.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  newContact: any = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  successMessage = '';
  errorMessage = '';

  constructor(private contactService:ContactService){}
  submitContact():void{
    this.contactService.create(this.newContact).subscribe({
      next: (res) => {
        this.successMessage = '✅ Your message has been sent!';
        this.errorMessage = '';
        this.newContact = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        this.errorMessage = '❌ Failed to send message!';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
