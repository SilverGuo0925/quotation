import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient, HttpParams} from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { tap,map,catchError, retry } from 'rxjs/operators';
import {Customer} from '../models/customer';
import { environment } from 'environments/environment';


export enum DocumentType{
  Quotation,
  Invoice,
  DeliveryNote
}

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
//  configUrl='http://localhost:8080/greeting';
 // fileUrl= 'http://localhost:9000/api/exportFile';
  customerUrl='http://localhost:9000/api/customer/newCustomer';
 // getCustomersUrl='http://localhost:9000/api/customer/getAllCustomers';
//  getCustomerUrl='http://localhost:9000/api/customer/getCustomer';
  
  serverUrl = environment.baseUrl;


  constructor(private http:HttpClient) { }

//  getConfig() {
//   return this.http.get<Config>(this.configUrl)
//     .pipe(
//       retry(3), // retry a failed request up to 3 times
//       catchError(this.handleError) // then handle the error
//     );
// }

// private handleError(error: HttpErrorResponse) {
//   if (error.error instanceof ErrorEvent) {
//     // A client-side or network error occurred. Handle it accordingly.
//     console.error('An error occurred:', error.error.message);
//   } else {
//     // The backend returned an unsuccessful response code.
//     // The response body may contain clues as to what went wrong,
//     console.error(
//       `Backend returned code ${error.status}, ` +
//       `body was: ${error.error}`);
//   }
//   // return an observable with a user-facing error message
//   return throwError(
//     'Something bad happened; please try again later.');
// }

public toggleNav() {
  this.sidenav.toggle();
}


// downloadFile(){
//   return this.http.get(this.fileUrl, {responseType: 'blob'})
//       .pipe(map((res: any) => {
//         console.log('res', res);
//         return res;
//       }));
// }
downloadFilewithParams(customerId:string,docType:DocumentType){
  let params = new HttpParams().set('customerId', customerId)
  .set('docType', docType.toString());

  return this.http.get(this.serverUrl+"/exportFile", {responseType: 'blob',params:params })
      .pipe(map((res: any) => {
        console.log('res', res);
        return res;
      }));
}
saveNewCustomer(customer: Customer)  {
  return this.http.post<any>(this.serverUrl+"/customer/newCustomer",customer,this.httpOptions )
.pipe(map(res => {
  return res;
}));
}

getCustomers() : Observable<Customer[]> {
  return this.http.get<Customer[]>(this.serverUrl+"/customer/getAllCustomers")
    .pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<Customer[]>('getHeroes', []))
    );
}

getCustomer(id: string) : Observable<Customer> {
  return this.getCustomers().pipe(
    map((customers:Customer[])=>customers.find(customer=>customer.id==id))
  );
   
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };

}
}
