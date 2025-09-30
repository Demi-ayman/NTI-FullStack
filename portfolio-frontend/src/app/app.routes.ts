import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { About } from './components/layout/about/about';
import { Education } from './components/layout/education/education';
import { Skills } from './components/layout/skills/skills';
import { Projects } from './components/layout/projects/projects';
import { Contact } from './components/layout/contact/contact';
import { Home } from './components/layout/home/home';
import { Dashboard } from './components/dashboard/dashboard';
import { EducationAdmin } from './components/dashboard/education-admin/education-admin';
import { HomeAdmin } from './components/dashboard/home-admin/home-admin';
import { ContactAdmin } from './components/dashboard/contact-admin/contact-admin';
import { SkillsAdmin } from './components/dashboard/skills-admin/skills-admin';
import { ProjectsAdmin } from './components/dashboard/projects-admin/projects-admin';
import { AboutAdmin } from './components/dashboard/about-admin/about-admin';
export const routes: Routes = [
  {
    path:'',
    component:Layout,
    children:[
      { path:'home',component:Home},
      { path:'about',component:About},
      { path:'education',component:Education},
      { path:'skills',component:Skills},
      { path:'projects',component:Projects},
      { path: 'contact', component: Contact },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]


  },
  {
    path:'',
    component:Dashboard,
    children:[
       { path:'dashboard/home',component:HomeAdmin},
       { path:'dashboard/about',component:AboutAdmin},
      { path:'dashboard/education',component:EducationAdmin},
      { path:'dashboard/skills',component:SkillsAdmin},
       { path:'dashboard/projects',component:ProjectsAdmin},
       { path: 'dashboard/contact', component: ContactAdmin },
       { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
