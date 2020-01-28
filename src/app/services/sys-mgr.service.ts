import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map,catchError, retry } from 'rxjs/operators';


export interface Config {
  id: number;
  content:string;
}

export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class SysMgrService {

  httpOptions = {
  };
  sidenav:any;
  // configUrl = 'https://jsonplaceholder.typicode.com/posts/42';
  configUrl='http://localhost:8080/greeting';
  fileUrl='http://localhost:9000/api/exportFile';

  constructor(private http:HttpClient) { }

 getConfig() {
  return this.http.get<Config>(this.configUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}

public toggleNav() {
  this.sidenav.toggle();
}

// downloadFile() {
//   return this.http.get<Config>(this.fileUrl)
//     .pipe(
//       retry(3), // retry a failed request up to 3 times
//       catchError(this.handleError) // then handle the error
//     );
// }

downloadFile(){
  return this.http.get(this.fileUrl, {responseType: 'blob'})
      .pipe(map((res: any) => {
        console.log('res', res);
        return res;
      }));
}
}
