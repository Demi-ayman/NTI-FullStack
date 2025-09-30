import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EducationAdmin } from '../education-admin/education-admin';

@Component({
  selector: 'app-header-admin',
  imports: [RouterLink,EducationAdmin],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css'
})
export class HeaderAdmin {

}
