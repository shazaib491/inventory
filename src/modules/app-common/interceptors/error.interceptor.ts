import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToasterService } from '@modules/app-common/services/toaster.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toasterService: ToasterService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error);

                let errorMessage = 'An Unknown Error Occured';
                if (error.message) {
                    errorMessage = error.error.message;
                }
                if (error.status == 422) {
                    errorMessage = error.error.errorMessage;
                }
                this.toasterService.error(errorMessage);
                // this.dialog.open(ErrorComponent,{data:{message:errorMessage}})
                return throwError(error);
            })
        );
    }
}
