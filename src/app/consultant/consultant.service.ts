import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Consultant} from './consultant';

@Injectable()
export class ConsultantService {
  private basePath: string = '/consultants';
  consultants : FirebaseListObservable<Consultant[]>;
  consultant : FirebaseObjectObservable<Consultant[]>;
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

   getConsultants(): FirebaseListObservable<Consultant[]> {      
    this.consultants = this.firedatabase.list(this.basePath, {
      query: {orderByChild: 'fullName'}
    });
    return  this.consultants;
  }  

  getConsultant(key: string) {  
    const itemPath =  `${this.basePath}/${key}`;
    return this.firedatabase.object(itemPath);  
  }

  getConsultantsAttached(consultants:string[]): Consultant[] { 
    let jobConsultants = new Array<Consultant>();
    if(typeof consultants != 'undefined'){
      for(var i = 0;i<consultants.length;i++) {  
          this.firedatabase.object(`${this.basePath}/`+consultants[i]).subscribe(consultant => {
            jobConsultants.push(consultant);
          });             
       }
    }
    return jobConsultants;
  }

  searchConsultant(orderBy, start, end) : FirebaseListObservable<any> {
    console.log(orderBy + "::::"+ start + ":::"+ end);
    return this.firedatabase.list(this.basePath, {
      query: {
        orderByChild: orderBy,
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });     
  }

  createConsultant(consultant:Consultant){
    this.consultants.push(consultant);
  }

  updateConsultant(consultant:Consultant){ 
    this.consultants.update(consultant.$key,consultant);
  }

  deleteConsultant(key: string): void {
     this.consultants.update(key,{active:'I'}) 
    //this.consultants.remove(key).catch(error => this.handleError(error))
  }
 
  private handleError(error) {
     console.log(error)
  }

}
