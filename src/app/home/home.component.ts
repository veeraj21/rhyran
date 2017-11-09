import { Component, OnInit} from '@angular/core';
import { favoriteChangedEventArgs } from '../favorite/favorite.component';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { LastnameValidator } from '../common/lastname-validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title:string ="WElcoemto home page";
  email: string = "welcome@yahoo.com";

  // creating reactive form
  formRective = new FormGroup({
     firstName : new FormControl('',Validators.required),
     lastName : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      //LastnameValidator.cannotContainSpace,
      //LastnameValidator.shouldBeUnique
     ])
  });
  
  log() {
    this.formRective.setErrors({
      invalid:true
    })
  }
  get firstName(){
    return this.formRective.get('firstName');
  }

  get lastName(){
    return this.formRective.get('lastName');
  }

  formRectiveInput(fieldName){
    return this.formRective.get(fieldName);
  }

  post = {
    title:'Welcome',
    favorite: true
  }
  constructor() { }

  favoriteChanged(eventArgs:favoriteChangedEventArgs){
    console.log('favoriteChanged called:::::', eventArgs.newValue);
  }

  ngOnInit() {
  }
  twoWayBinding(){
    console.log("twoWayBinding called Email Value" + this.email);
  } 

  comVariable(){
    console.log("Email Value" + this.email);
  }
  checkValue(checkVal, $event){
    $event.stopPropagation();
    console.log("Vale ::"+ checkVal);
  }

  checkPropagation(eventArgs: favoriteChangedEventArgs){
    console.log("checkPropagation Called ::" +eventArgs.newValue);
  }
}
