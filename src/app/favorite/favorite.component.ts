import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  inputs:['checkFavorite']
})
export class FavoriteComponent implements OnInit {
  @Output('facChangeEvent') change = new EventEmitter();  
  @Input('isfavorite') isfavorite: boolean= false;  // First way to creat input property, inside () is an alias
  checkFavorite : boolean   // Second way to create input property, defined in componentnt input block
 
  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.isfavorite = !this.isfavorite;
    this.checkFavorite = !this.isfavorite;
    this.change.emit({newValue:this.isfavorite});    
  }
  
}

export interface favoriteChangedEventArgs {
  newValue:boolean;
}