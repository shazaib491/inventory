import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '@modules/auth/services';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit, OnDestroy {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;
    userIsAuthenticated = false;
    private authListenerSubs?: Subscription;
    expanded = false;
    routeData!: SBRouteData;
    UserRole:any;
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                if(this.userIsAuthenticated){

                }
            });
        this.authService.autoAuthUser();
    }


    addBar(event:any,text:string){
        if(text=='Logout'){
            this.authService.logout();
        }
        this.expanded = !this.expanded

    }
    ngOnDestroy() {
        this.authListenerSubs?.unsubscribe();
      }
}
