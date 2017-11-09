import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Job} from './job'
import {JobService} from './job.service'


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  jobs : FirebaseListObservable<any[]>;
  
  constructor(private _service: JobService,  private afAuth:AngularFireAuth ,  private router:Router) { }

  ngOnInit() {
    this.getJobs();   
  }

  getJobs(){
    this.jobs = this._service.getJobs();   
  }

  deleteJob(key){
     this._service.deleteJob(key)
   }

}
