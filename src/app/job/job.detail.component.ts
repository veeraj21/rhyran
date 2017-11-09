import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Job} from './job'
import {JobService} from './job.service'
import { Consultant } from '../consultant/consultant';
import { ConsultantService} from '../consultant/consultant.service';

@Component({
  selector: 'app-jobDetails',
  templateUrl: './job.details.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobDetailComponent implements OnInit {
  job : FirebaseObjectObservable<any>;  
  consultants : FirebaseListObservable<any[]>;
  jobNew : Job = new Job();
  jobNewFlag : boolean= true;
  constructor(private _service: JobService,private _conservice: ConsultantService,private router:ActivatedRoute) {}
  ngOnInit() {   
    const id = this.router.snapshot.params["id"];    
      if(id != -1){
        this.jobNewFlag = false;
        this.job = this._service.getJob(id);    
        console.log(id +"<<<<>>>>"+ this.job);                  
      }else{
        this.jobNewFlag = true;
      } 
  }

  createJob(){
    console.log("Job Created" +this.jobNew.jobTitle);
    this._service.createJob(this.jobNew);
    this.jobNew = new Job(); // reset to defaults
  }

  getConsultants(){
    this.consultants = this._conservice.getConsultants();
  }

  updateJob(){
    console.log("Job Updated" +this.jobNew.jobTitle);
    this._service.updateJob(this.jobNew);
   
  }

}
