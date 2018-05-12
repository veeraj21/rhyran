import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Job} from './job'
import {JobService} from './job.service'
import { Consultant } from '../consultant/consultant';
import { ConsultantService} from '../consultant/consultant.service';
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-jobDetails',
  templateUrl: './job.details.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobDetailComponent implements OnInit {
  consults : FirebaseListObservable<any[]>;
  consultsAttached : Consultant[]= new Array<Consultant>();  
  job : Job = new Job();
  userEmail : string;
  jobNewFlag : boolean= true;
  startAt = new Subject();
  endAt = new Subject();
  movies;
  lastKeypress: number = 0;
  constructor(private _service: JobService,private _conservice: ConsultantService, private router:ActivatedRoute,private afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(
      auth => {
          if(auth){
            this.userEmail= auth.email;
          }
      });

  }
  ngOnInit() {   
    const id = this.router.snapshot.params["id"];    
      if(id != -1){
        this.jobNewFlag = false;
        this._service.getJob(id).subscribe(job => {
          this.job = job;
          this.getConsultantsAttached(this.job.consultants);
            }) ;        
      }else{
        this.jobNewFlag = true;
        this.job = new Job();
      } 
      this._conservice.searchConsultant("fullName",this.startAt, this.endAt).subscribe(movies => this.movies = movies);    
  }

  search($event) {
    let q = $event.target.value;
    if(q.length <1){
      this.movies = null;
    }else{
      if ($event.timeStamp - this.lastKeypress > 200) {
      this.startAt.next(q);
      this.endAt.next(q+"\uf8ff");
      this._conservice.searchConsultant("fullName",this.startAt, this.endAt).subscribe(movies => this.movies = movies);
      }
    }
    this.lastKeypress = $event.timeStamp;   
  }

  createJob(){
    console.log("Job Created called");
    this.job.createdBy=this.userEmail;
    this._service.createJob(this.job);
    //this.job = new Job(); // reset to defaults
  }

  updateJob(){
    console.log("Job Updated" +this.job.$key);
    this._service.updateJob(this.job);   
  }

  addToJob(id:string){
     if(typeof this.job.consultants == 'undefined'){
      this.job.consultants = new Array(); 
     }
     if(this.job.consultants.indexOf(id) == -1){
      this.job.consultants.push(id);
      this._service.updateJob(this.job);     
    }      
  }

  removeFromJob(id:string){
    if(this.job.consultants.indexOf(id) != -1){
     this.job.consultants.splice(this.job.consultants.indexOf(id) , 1);
     this._service.updateJob(this.job);     
   }      
 }

  getConsultants(){
    this.consults = this._conservice.getConsultants();
  }

  getConsultantsAttached(consultants:string[]){
     this.consultsAttached = this._conservice.getConsultantsAttached(consultants);   
  }

}
