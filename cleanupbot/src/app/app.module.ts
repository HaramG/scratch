import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service'
  var config = {
    apiKey: "AIzaSyD-lU1X1V_t1AqdS2TxyHbgdZ2YOE3ku2Y",
    authDomain: "create-b608f.firebaseapp.com",
    databaseURL: "https://create-b608f.firebaseio.com",
    storageBucket: "create-b608f.appspot.com",
    messagingSenderId: "599780700187"
  };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
