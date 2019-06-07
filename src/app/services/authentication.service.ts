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
  url='http://localhost:8080/demo-0.0.1-SNAPSHOT/pusers';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   this.user =new User();
   this.user.username="dengting";
   this.user.password="test";
   this.user.token="test";
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string)  {
    return this.http.post<User>(this.url,this.user,this.httpOptions )
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));

  }
 
}
