import {AngularFireModule} from 'angularfire2';

export const firebaseConfig = {
     apiKey: "AIzaSyDxMwwEOwe8IJxequcdvYLgwZp6xoYt_sc",
    authDomain: "rhyranconsulting.firebaseapp.com",
    databaseURL: "https://rhyranconsulting.firebaseio.com",
    projectId: "rhyranconsulting",
    storageBucket: "rhyranconsulting.appspot.com",
    messagingSenderId: "17697265661"
  };

  export const CONST_FIREBASE_CONFIG = AngularFireModule.initializeApp(firebaseConfig)