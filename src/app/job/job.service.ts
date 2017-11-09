import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Job} from './job'

@Injectable()
export class JobService {
  private basePath: string = '/jobs';
  jobs : FirebaseListObservable<any[]>;  
  userEmail : string;
  _adminUser : boolean= false;
  constructor(private afAuth:AngularFireAuth ,  private firedatabase : AngularFireDatabase) { 
    this.afAuth.authState.subscribe(
      auth => {
          if(auth){
            this.userEmail = auth.email;
            if('veeraj21@gmail.com' == auth.email){
              this._adminUser = true;
            }else{
              this._adminUser = false;
            }
            console.log("User", auth.email);
          }
      });
  }

  getJobs(query={}): FirebaseListObservable<any[]> {
    this.jobs = this.firedatabase.list(this.basePath, {
      query: {orderByChild: 'createdAt'}
    });
    return this.jobs;
  }

  getJob(id) {
    return this.firedatabase.object(this.basePath+"/"+id);    
  }

  createJob(job:Job){
    job.createdBy=this.userEmail;
    this.jobs.push(job);
  }

  updateJob(job:Job){ // Change the data
    this.jobs.push(job);
  }

  deleteJob(key: string): void {
     this.jobs.remove(key)
       .catch(error => this.handleError(error))
  }
    private handleError(error) {
     console.log(error)
   }


}
