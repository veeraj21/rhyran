import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class LoginService {
  loginError:boolean=false;
  constructor(private afAuth:AngularFireAuth ,  private router:Router, private fire: AngularFireModule) { }

     signup(email,password){
         this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
        (success) => {
        this.router.navigate(['/home']);
      }).catch(
        (err) => {
        console.log(err.message);
      })       
      }

      login(email,password){
          this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
        (success) => {
        this.router.navigate(['/home']);
      }).catch(
        (err) => {
          this.loginError=true;
         console.log("ErrorMessage:::>>>"+err.message);
      });
      }

      signout(){
        this.afAuth.auth.signOut();
      }

}
