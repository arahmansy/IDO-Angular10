import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:5000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService { 

  constructor(private http: HttpClient) { }

  
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'users', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  
}
