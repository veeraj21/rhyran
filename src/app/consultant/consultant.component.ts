import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Consultant} from './consultant'
import {ConsultantService} from './consultant.service'
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {
  consultant : Consultant = new Consultant();
  consultants : any[];
  _adminUser : boolean= false;
  searchType:string="fullName";
  searchValue:string="";
  startAt = new Subject();
  endAt = new Subject();
  constructor(private _service: ConsultantService,private afAuth:AngularFireAuth ,  private router:Router) { }
  
  ngOnInit() {
    this.getConsultants();
  }
  
  getConsultants(){
    this._service.getConsultants().subscribe((snaps) => {
      this.consultants = snaps;
      });
  }

  createConsultant(){
    console.log("Job Created" +this.consultant.contactAddress);
    this._service.createConsultant(this.consultant);
    this.consultant = new Consultant(); // reset to defaults
  }

   deleteConsultant(key){
     this._service.deleteConsultant(key);    
   }

   searchConsultant(){       
     if(this.searchValue.length <1){
        this.getConsultants();
     }else{
      this.startAt.next(this.searchValue);
      this.endAt.next(this.searchValue+"\uf8ff");
        this._service.searchConsultant(this.searchType,this.startAt,this.endAt).
                 subscribe(consultants => { 
                   console.log("Got the Results");
                   this.consultants = consultants;
                   consultants.forEach(item =>  console.log("check<<<<<<<<"+item.fullName));                   
                  });
      }     
    }  

}
