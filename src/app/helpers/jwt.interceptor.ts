import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem('jwt-token')) {
            request = request.clone({
                setHeaders: {
                    "App-Authorization": 'Bearer ' + sessionStorage.getItem('jwt-token')
                },
            });
        }

        return next.handle(request).pipe(map(response => {
            if (response instanceof HttpResponse) {
                if (response.headers.get('X-Auth-Token')) {
                    sessionStorage.setItem('jwt-token', response.headers.get('X-Auth-Token'));
                }
            }
            return response;
        }));

    }
}