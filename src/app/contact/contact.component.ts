import { Component, OnInit } from '@angular/core';

import {Contact} from './contact'
import {ContactService} from './contact.service'
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact : Contact = new Contact();
  contacts : FirebaseListObservable<any[]>;
  _adminUser : boolean= false;
   private isOpen:boolean = false;
  constructor(private _service: ContactService,private afAuth:AngularFireAuth ,  private router:Router) { 
    this.afAuth.authState.subscribe(
        auth => {
            if(auth){
              if('veeraj21@gmail.com' == auth.email){
                this._adminUser = true;
              }else{
                this._adminUser = false;
              }
              console.log("User", auth.email);
            }
        });

  }

  ngOnInit() {
    this.getContacts();
  }

  addContact(){
     this._service.addContact(this.contact);
     this.contact = new Contact(); // reset to defaults
  }

  getContacts(){
    this.contacts = this._service.getContacts();
  }

  deleteContact(key){
    this._service.deleteContact(key)
  }

  toggleOpen(event: MouseEvent): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }  

}
