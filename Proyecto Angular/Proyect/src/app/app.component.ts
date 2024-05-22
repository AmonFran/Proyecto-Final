import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Proyect';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyCbHRHOeXWa3E-jXQl3PnDNtMKr3wQUNJQ",
      authDomain: "prueba-http-e208f.firebaseapp.com",
      databaseURL: "https://prueba-http-e208f-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "prueba-http-e208f",
      storageBucket: "prueba-http-e208f.appspot.com",
      messagingSenderId: "153233816175",
      appId: "1:153233816175:web:19d42a6509941f7b78ab9a"
    })
  }
}
