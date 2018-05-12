import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Review} from './review';
import {Observer} from "rxjs";

@Injectable()
export class ReviewsService {
  private basePath: string = '/reviews';
  reviews : FirebaseListObservable<Review[]>;
  review : FirebaseObjectObservable<Review>;
  reviewObj : Review;

  constructor(private afAuth:AngularFireAuth ,  private router:Router, 
                   private firedatabase : AngularFireDatabase) { 
    
  }
 
 createReview(rev: Review): void{
    this.reviews.push(rev);
  }

  getReviews(query={}): FirebaseListObservable<Review[]> {
    return this.firedatabase.list(this.basePath, {
      query: {orderByChild: 'createdAt'}
    });   
  }

  getReview(key: string): FirebaseObjectObservable<Review> {
    const itemPath =  this.basePath +"/"+ key; 
    this.review = this.firedatabase.object(itemPath);
    return this.review;
  } 

  deleteReview(key: string): void {
     this.reviews.remove(key).catch(this.handleError);
 }

 updateReviewLike($key:string, count: number): void {
     this.reviews.update($key,{likes:count}).catch(this.handleError);
 }

 deleteAllReviews(): void {
     this.reviews.remove().catch(this.handleError);
 }

 private handleError(error) {
     console.log(error);
 }
 

}
