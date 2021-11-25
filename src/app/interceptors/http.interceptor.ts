import { ComponentFactoryResolver, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   /* let currentUser: LoggedUserModel;*/

    //this._authService.isAuthenticated().pipe(take(1)).subscribe(user => currentUser = user)

    /*if(currentUser){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }*/
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if(err.status === 0 || err.status === 401) {
        //this.router.navigate(['/']);
      } else if(err.status === 400 || err.status===500) {
        //console.log("Error 400 or 500");
        //console.log(err.error.Message);
        Swal.fire({
          "icon":"error",
          "title":"Oops",
          "text":err.error
        })
        //this.goToPageError(err.error.description);
      } else {
        return;
      }
    }
  }));
  }

  private goToPageError(msg:string): void {
    this.router.navigate(['error-404']);
  }

 
}
