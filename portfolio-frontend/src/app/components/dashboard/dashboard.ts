import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAdmin } from './header-admin/header-admin';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,HeaderAdmin],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
