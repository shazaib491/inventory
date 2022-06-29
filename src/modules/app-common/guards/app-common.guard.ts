import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppCommonGuard implements CanActivate {

    canActivate(
        route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot):  Observable<boolean | UrlTree>  {

        return of(true);
    }
}
