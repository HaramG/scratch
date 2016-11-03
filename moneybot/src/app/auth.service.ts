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
  firebase.database().ref('bots/moneybot/uid').once('value').then(d=>{
    uid = d.val();
    console.log(uid);
    if(uid === nigga.uid){
    this.tru = true;
    this.uid = uid;
    console.log('checkbot success!')
    this.fetchloop(nigga)
    }else{
      this.tru = true;
      firebase.auth().signOut()
    }
  })
}
seperate(todos){
  var lots;
  for(let todo of todos){
    return lots ++
  }
  var split = lots/100;
  var done = 0;
  var seperation = 0;
  for(let todo of todos){
    if(todo.status === 'pending'){
      this.seperations[seperation].push(todo);
      done ++
      if(done >= split){
        seperation ++
      }
    }
    if(todo.status === 'completed'){
      var key = Object.keys(todo)[0];
      firebase.database().ref('bots/moneybot/payments/')
      firebase.database().ref('bots/moneybot/community/todo/'+key).remove()
    }
  }
  var indexer = 0;
  for(let seperation of this.seperations){
    firebase.database().ref('bots/moneybot/process/'+indexer).push({seperation});
    indexer ++
  }
}
seperations = [];
completed = {};
fetchloop(arg){
  console.log('fetchlopp fire success!')
  firebase.database().ref('bots/moneybot/payments/').once('value').then(y=>{
    if(y.val()){
      var items = y.val();
      console.log('item fetch success!')
      this.execute(items)
    }
  })
  firebase.database().ref('bots/moneybot/community/todo').once('value').then(z=>{
    if(z.val()){
      var todos = z.val();
      console.log('todo fetch success!')
      this.seperate(todos)
    }
  })
}
execute(items){
  console.log(items);
  for(let item of items){
    console.log(item)
    if(item.status === 'completed'){
      firebase.database().ref('bots/moneybot/payments/'+item).remove()
    }
    if(item.destination === 'community'){
      this.send(item.sender,this.uid,item.amount,item.purpose,item.type,item.status,item.method,item.provenance)
    }
    if(item.destination === 'user'){
      this.send(item.sender,item.recipient,item.amount,item.purpose,item.type,item.status,item.method,item.provenance)
    }
  }
}
send(sender,recipient,amount,purpose,type,status,method,provenance){
  if(method === 'kudos'){
  firebase.database().ref('bots/moneybot/wallets/'+sender+'/'+provenance+'/balance').transaction(s=>{
    if(s){
      var ok = false;
      if(s >= amount){
        ok = true;
        return s -= amount
      }
      if(ok){
        firebase.database().ref('bots/moneybot/wallets/'+recipient+'/'+provenance+'/balance').transaction(d=>{
          return d += amount
        })
        firebase.database().ref('bots/moneybot/wallets/'+recipient+'/streams/received/'+provenance).set({
          sender: sender,
          recipient: recipient,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          amount: amount,
          type: type,
          method: method,
          purpose: purpose,
          provenance: provenance
        })
        firebase.database().ref('bots/moneybot/wallets/'+sender+'/streams/sent/'+provenance).push({
          sender: sender,
          recipient: recipient,
          timestamp: - firebase.database.ServerValue.TIMESTAMP,
          amount: amount,
          type: type,
          method: method,
          purpose: purpose,
          status: status,
          provenance: provenance
        })
      }
    }
  })
  return
  }
  if(method === 'payout'){
    recipient = this.uid;
    firebase.database().ref('bots/moneybot/wallets'+sender+'/balance').transaction(s=>{
      if(s){
        var ok = false;
        if(s >= amount){
          ok = true;
          return s -= amount
        }
        if(ok){
          firebase.database().ref('bots/moneybot/community/balance').transaction(d=>{
            return d += amount
          })
          firebase.database().ref('bots/moneybot/community/todo').push({
            sender: sender,
            recipient: 'community',
            timestamp: - firebase.database.ServerValue.TIMESTAMP,
            amount: amount/10,
            type: type,
            method: method,
            purpose: purpose,
            status: 'processing'
          })
          firebase.database().ref('bots/moneybot/wallets/'+sender+'/sent').push({
            sender: sender,
            recipient: 'community',
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            amount: amount,
            type: type,
            method: method,
            purpose: purpose,
            status: 'processing'
          })
        }
      }
    })
  }
}
buykudos(item,recipient){}
advertise(item,recipient){}
nigga;
uid;
c = {
  email: '',
  pw: ''
}
tru:boolean = false;

}