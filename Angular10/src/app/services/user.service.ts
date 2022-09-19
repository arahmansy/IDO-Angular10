import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
//import {Observable} from 'rxjs';
//import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

import { AngularFireAuth } from  "@angular/fire/auth";
import firebase from 'firebase/app';


import { User } from '../models/user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:35257';
  username;
  user;
  userData: Observable<firebase.User>;

  constructor(private http: HttpClient ,public  afAuth:  AngularFireAuth , private router:Router ) { 

 this.userData = afAuth.authState;


 

  }




  SignIn(email: string, password: string) {
        this.afAuth.signInWithEmailAndPassword(email,password).then(
          res =>{
            console.log("you are logged in")
            localStorage.setItem("email",email)
            this.router.navigate(['/home']);}

            ).catch(err =>{
            console.log('error ',err)
          })
        
    }

    async logout(){
      await this.afAuth.signOut();
      localStorage.removeItem('email');
      this.router.navigate(['login']);
      
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('email'));
    return  user  !==  null;
}

  


  registerUser(user : User){
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    return this.http.post(this.rootUrl + '/api/User/Register', body);
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }
  

  getUserClaims(){
    return  this.http.get(this.rootUrl+'/api/GetUserClaims');
   }
   

   

}