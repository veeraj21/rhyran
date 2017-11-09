import { Component, OnInit } from '@angular/core';
import {ReviewsService} from './reviews.service'
import {Router} from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Review} from './review';
import { TruncateModule } from 'ng2-truncate';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'] 
})
export class ReviewsComponent implements OnInit {
  user : string;
  reviews : FirebaseListObservable<Review[]>;
  review : FirebaseObjectObservable<Review[]>;
  reviewObj:Review;
  uuid:string = null;
  _adminUser : boolean= false;
  constructor(private _service:ReviewsService, private afAuth:AngularFireAuth ,  private router:Router) {

    console.log("ReviewsComponent  constructor called here");

      this.afAuth.authState.subscribe(
        auth => {
            if(auth){
              this.user = auth.email;
              this.uuid=auth.uid;
              console.log("Current Token attached"+auth.uid);
              if('veeraj21@gmail.com' == auth.email +""){
                this._adminUser = true;
              }else{
                this._adminUser = false;
              }
              console.log("User", auth.email);
            }          

        });
        
  }
 
  ngOnInit() {
    this.getReviews();
  }
 
  createReview(field){
    this.reviewObj = new Review();
    this.reviewObj.text=field.value;
    this.reviewObj.createdBy=this.user;
    this._service.createReview(this.reviewObj);
  }

  getReviews(){
      
      this.reviews = this._service.getReviews();
      console.log("getReviews called here" + this.reviews);
  }
    
  
  remove($key:string){
    this._service.deleteReview($key);
  }

  like($key:string, count: number){
     this._service.updateReviewLike($key,count+1);
  }

  removeAll(){
    this._service.deleteAllReviews();
  } 
  
   
}
