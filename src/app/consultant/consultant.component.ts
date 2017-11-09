import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Consultant} from './consultant'
import {ConsultantService} from './consultant.service'

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {
  consultant : Consultant = new Consultant();
  consultants : FirebaseListObservable<any[]>;
  _adminUser : boolean= false;
  constructor(private _service: ConsultantService,private afAuth:AngularFireAuth ,  private router:Router) { }

  
  ngOnInit() {
    this.getConsultants();
  }
  
  getConsultants(){
    this.consultants = this._service.getConsultants();
  }

  createConsultant(){
    console.log("Job Created" +this.consultant.contactAddress);
    this._service.createConsultant(this.consultant);
    this.consultant = new Consultant(); // reset to defaults
  }

   deleteConsultant(key){
     this._service.deleteConsultant(key)
   }

}
