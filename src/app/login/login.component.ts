import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {LoginService} from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  admin:boolean =false;
  constructor(private afAuth:AngularFireAuth ,  private router:Router, private _service: LoginService) { 
     this.afAuth.authState.subscribe((auth) => {
        if (auth) {
           router.navigate(['/home']);
        }
      });     
  }

     ngOnInit() {}

      signup(form){
         this._service.signup(form.value.email, form.value.password);
        form.reset();
      }

      login(form){
        this._service.login(form.value.email, form.value.password);        
      }    

}