import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { FormControl,Validator,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';


 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {


   
  
  responsdata : any;
  username="";
  password="";
  loginForm = new FormGroup(
    {
     // userid : new FormControl(0),
       username : new FormControl("",[Validators.required,Validators.email]),
       password: new FormControl("",Validators.required)
    }
  )
  isLoginError: boolean;
   
  constructor( private userService :UserService , private route : Router) { }

  ngOnInit(): void {
  }


  loginUsingEmailAndPassowrd()
  {
    this.username  = this.loginForm.get("username").value;
    this.password=  this.loginForm.get("password").value;
    this.userService.SignIn(this.username,this.password);
    localStorage.setItem('username',this.username);
    this.isLoginError=!this.userService.isLoggedIn;

  }


  _login()
  {
    if(this.loginForm.valid)
    {
      this.username  = this.loginForm.get("username").value;
      this.password=  this.loginForm.get("password").value;

        
     this.userService.userAuthentication(this.username,this.password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('username',this.username);
      console.log(data.access_token);
      this.route.navigate(['/home']);
     
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });

    }
    else
    {

    }

  }

}
