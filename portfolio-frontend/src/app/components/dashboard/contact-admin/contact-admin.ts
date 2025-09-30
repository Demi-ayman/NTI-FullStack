import { Component } from '@angular/core';
import { ContactService } from '../../../core/services/contact.service/contact.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-admin',
  imports: [CommonModule],
  templateUrl: './contact-admin.html',
  styleUrl: './contact-admin.css'
})
export class ContactAdmin {
  contacts:any[] = [];
  errorMessage = '';
  constructor(private contactService:ContactService){}

  ngOnInit():void{
    this.loadContacts();
  }

  loadContacts(){
    this.contactService.getAll().subscribe({
      next:(data)=>this.contacts = data,
      error:(err)=> this.errorMessage = 'Failed to load contacts'
    });
  }

  deleteContact(id:string){
    if(!confirm('Are you sure you want to delete this contact?')) return ;

    this.contactService.delete(id).subscribe({
      next:()=>{
        this.contacts = this.contacts.filter(c=> c._id !== id);
      },
      error:(err) => this.errorMessage = 'Failed to delete contact'
    });
  }
}
