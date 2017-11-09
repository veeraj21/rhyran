import { Component, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {LoginService} from '../app/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  user : string;
  color: string;

  constructor(private afAuth:AngularFireAuth ,  private router:Router, private _service: LoginService) {
    this.afAuth.authState.subscribe(
        auth => {
            if(auth){
              this.user = auth.email;
              router.navigate(['/reviews']);
              console.log("User", auth.email);
            }else{
              router.navigate(['/home']);
            }
        });
    }

    signout(){
        this._service.signout();
        this.router.navigate(['/home']);
        this.user=null;
      }

}
