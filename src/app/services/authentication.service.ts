import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  user:User;
  token:string;
  url='http://localhost:9000/api/login';
  url_profile='http://localhost:9000/api/user/profile';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   this.user =new User();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string)  {
        return this.http.post<any>(this.url,{username,password},this.httpOptions )
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.user.token=user.token;
          this.user.username=username;
          this.user.password=password;
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.currentUserSubject.next(this.user);
        }

        return this.user;
      }));

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

getProfile(token: string)  {
  return this.http.post<any>(this.url_profile,{token},this.httpOptions )
.pipe(map(user => {
  // login successful if there's a jwt token in the response
  if (user && user.username) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    this.user.username=user.username;
   
  }

  return this.user;
}));

}

}
