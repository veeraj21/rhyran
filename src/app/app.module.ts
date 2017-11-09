import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormControl,FormsModule, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2'
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ServicesComponent } from './services/services.component';
import { HomeComponent } from './home/home.component';
import { TruncateModule } from 'ng2-truncate';
import { JobComponent } from './job/job.component';
import { JobDetailComponent } from './job/job.detail.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { FavoriteComponent } from './favorite/favorite.component';

import {CONST_ROUTING} from './app.routes';
import {CONST_FIREBASE_CONFIG} from './app.firebase';
//Services
import {LoginService} from './login/login.service';
import {ContactService} from './contact/contact.service';
import {TeamService} from './team/team.service';
import {ReviewsService} from './reviews/reviews.service';
import {JobService} from './job/job.service';
import { ConsultantService } from './consultant/consultant.service';
import {HighlightDirective} from './common/highlight.directive';
import {AccordionModule} from 'primeng/primeng';
import {SummaryPipe} from './appPipes/summary.pipe';
import {SortPipe} from './appPipes/sort.pipe';

import { AppInputFormatDirective } from './customDirective/app-input-format.directive';
import {AppErrorHandler} from './common/app-error-handler';


@NgModule({
  declarations: [ AppComponent, LoginComponent,  TeamComponent, ContactComponent, ReviewsComponent, HomeComponent,
      ServicesComponent,JobDetailComponent, JobComponent,HighlightDirective,SummaryPipe,SortPipe, FavoriteComponent, AppInputFormatDirective, ConsultantComponent],
  imports: [BrowserModule,FormsModule,HttpModule,AppRoutingModule,AngularFireAuthModule,AngularFireDatabaseModule,
    CONST_ROUTING, CONST_FIREBASE_CONFIG,TruncateModule,ReactiveFormsModule],
  providers: [LoginService,ConsultantService, TeamService, ReviewsService,ContactService,JobService,{provide:ErrorHandler, useClass:AppErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
