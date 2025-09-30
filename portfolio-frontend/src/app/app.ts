import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Skills } from './components/layout/skills/skills';
// import { Education } from './components/layout/education/education';
// import { About } from './components/layout/about/about';
// import { Projects } from './components/layout/projects/projects';
// import { Contact } from './components/layout/contact/contact';
import { Header } from './components/layout/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio-frontend');
}
