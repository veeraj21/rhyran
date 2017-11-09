import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Consultant} from './consultant';

@Injectable()
export class ConsultantService {
  private basePath: string = '/consultants';
  consultants : FirebaseListObservable<any[]>;
  consultant : FirebaseObjectObservable<any[]>;
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

   getConsultants(query={}): FirebaseListObservable<any[]> {
    this.consultants = this.firedatabase.list(this.basePath, {
      query: {orderByChild: 'createdAt'}
    });
    return this.consultants;
  }

  createConsultant(consultant:Consultant){
    consultant.createdBy=this.userEmail;
    this.consultants.push(consultant);
  }

  updateConsultant(consultant:Consultant){ 
    this.consultants.push(consultant);
  }

  deleteConsultant(key: string): void {
     this.consultants.remove(key)
       .catch(error => this.handleError(error))
  }
    private handleError(error) {
     console.log(error)
   }

}
