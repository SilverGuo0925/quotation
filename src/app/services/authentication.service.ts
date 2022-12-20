import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';


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

  baseUrl = environment.baseUrl;
  //url='http://localhost:9000/api/login';

 // url='http://localhost:9000/api/login';
 // url='http://qingprint.sg:8080/qp-public-webservice-0.0.1-SNAPSHOT/api/login';

 // url_profile='http://localhost:9000/api/user/profile';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(this.decodeToken(sessionStorage.getItem('jwt-token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginId: string, password: string)  {
        return this.http.post<any>(this.baseUrl+'/users/authenticate', {loginId,password},this.httpOptions )
      .pipe(map(auth => {
        // login successful if there's a jwt token in the response
        if (auth.user && auth.auth) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          auth.user.token = sessionStorage.getItem('jwt-token');
          this.currentUserSubject.next(auth.user);
      }
      return auth;
  }));
}

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('jwt-token');    
    this.currentUserSubject.next(null);
}

getProfile(): Observable<any> {  
  return this.http.get(this.baseUrl+"/users/profile")

};



decodeToken(token: string) {
  if (!token) {
    return;
  }
  const _decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token));
    } catch {
      return;
    }
  };
  return token
    .split('.')
    .map(token => _decodeToken(token))
    .reduce((acc, curr) => {
      if (!!curr) acc = { ...acc, ...curr };
      return acc;
    }, Object.create(null));
}

}
