import { Injectable } from '@angular/core';

import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Contact} from './contact';

@Injectable()
export class ContactService {
  private basePath: string = '/contacts';
  contacts : FirebaseListObservable<any[]>;
  contact : FirebaseObjectObservable<any[]>;
  
  constructor(private afAuth:AngularFireAuth ,  private firedatabase : AngularFireDatabase) { }

  getContacts(query={}): FirebaseListObservable<any[]> {
    this.contacts = this.firedatabase.list(this.basePath, {
      query: {orderByChild: 'createdAt'}
    });
    return this.contacts;
  }

  addContact(contact:Contact){
    this.contacts.push(contact);
  }

  deleteContact(key: string): void {
     this.contacts.remove(key)
       .catch(error => this.handleError(error))
  }
    private handleError(error) {
     console.log(error)
   }

}
