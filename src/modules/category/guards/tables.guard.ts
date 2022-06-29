import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TablesGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthService) {

    }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
            this.authenticationService.getRoleStatusListener().subscribe((role: any) => {
                    if (route.data.roles && route.data.roles.indexOf(role) === -1) {
                    this.router.navigate(['/dashboard']);
                    return false;
                }
            });
            return of(true);
    }
}
