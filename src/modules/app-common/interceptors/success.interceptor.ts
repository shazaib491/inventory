import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToasterService } from '@modules/app-common/services/toaster.service';

tap
@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

  constructor(public toasterService: ToasterService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(evt => {
        let successMessage:any="";
        if (evt instanceof HttpResponse ) {
            console.log(evt.status)
            if(evt.status==201){
              console.log(evt)
            successMessage=evt.body;
            this.toasterService.success(successMessage.message)
          }
        }
      }));
    }

}
