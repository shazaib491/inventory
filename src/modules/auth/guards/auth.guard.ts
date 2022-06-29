import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService,private router:Router){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuth = this.authService.getIsAuth();
        console.log(isAuth,"Dashboard");
        if (!isAuth) {
            this.router.navigate(['/auth/login'])
          }
            return true;

      }
}
