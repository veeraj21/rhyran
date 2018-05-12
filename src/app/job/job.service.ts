import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Job} from './job'

@Injectable()
export class JobService {
  private basePath: string = '/jobs';
  jobs : FirebaseListObservable<Job[]>;  
  job : FirebaseObjectObservable<Job>;
  
  _adminUser : boolean= false;
  constructor(private afAuth:AngularFireAuth ,  private firedatabase : AngularFireDatabase) {  }

  getJobs(query={}): FirebaseListObservable<any[]> {
    this.jobs = this.firedatabase.list(this.basePath, {
      query: {orderByChild: 'createdAt'}
    });
    return this.jobs;
  }

  getJob(key: string) {  
    const itemPath =  `${this.basePath}/${key}`;
    this.job = this.firedatabase.object(itemPath);
    return this.job;
  }

  createJob(job:Job){ 
    this.jobs.push(job);
  }

  updateJob(job:Job){ 
    this.jobs.update(job.$key,job);
  }

  deleteJob(key: string): void {
     this.jobs.remove(key).catch(error => this.handleError(error))
  }
  
  private handleError(error) {
     console.log(error)
   }


}
