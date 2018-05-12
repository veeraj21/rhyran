import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ServicesComponent } from './services/services.component';
import { JobComponent } from './job/job.component';
import { JobDetailComponent } from './job/job.detail.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { ConsultantDetailComponent } from './consultant/consultant.detail.component';

export const router: Routes = [  
{ path:'',redirectTo:'/home', pathMatch: 'full'},
{ path:'home',component:HomeComponent},
{ path:'contact',component:ContactComponent},
{ path:'team',component:TeamComponent},
{ path:'services',component:ServicesComponent},
{ path:'jobs',component:JobComponent},
{ path: "jobDetails/:id", component: JobDetailComponent},
{ path:'consultants',component:ConsultantComponent},
{ path: "consultantDetails/:id", component: ConsultantDetailComponent},
{ path:'reviews',component:ReviewsComponent},
{ path:'login', component:LoginComponent},
{ path:'logout', component:LoginComponent}
]

export const CONST_ROUTING: ModuleWithProviders = RouterModule.forRoot(router);