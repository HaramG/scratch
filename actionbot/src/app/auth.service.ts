import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
@Injectable()
export class AuthService {
  constructor(@Inject(FirebaseApp) firebase) {
    this.firebase = firebase;
    firebase.auth().onAuthStateChanged(s=>{
      this.nigga = s;
      console.log(this.nigga)
      this.checkBot(this.nigga)
    })
  }
firebase:any;
initialize(){
  firebase.auth().signInWithEmailAndPassword(this.c.email,this.c.pw)
}
demodulate(){
  firebase.auth().signOut()
}
items;
checkBot(nigga){
  var uid;
  console.log('checkbot fired!');
  firebase.database().ref('bots/actionbot/uid').once('value').then(d=>{
    uid = d.val();
    console.log(uid);
    if(uid === nigga.uid){
    this.tru = true;
    console.log('checkbot success!')
    this.fetchloop(nigga)
    }
  })
}
fetchloop(arg){
  console.log('fetchlopp fire success!')
  firebase.database().ref('bots/actionbot/items/').once('value').then(y=>{
    if(y.val()){
      var items = y.val();
      console.log('item fetch success!')
      this.execute(items)
    }
  })
}
execute(items){
  console.log(items);
  for(let item of items){
    console.log(item)
  }
}
nigga;
uid;
c = {
  email: '',
  pw: ''
}
tru:boolean = false;
}