import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService, UserService } from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];
    userNavSections:any;
    role:any;
    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;
    navigationDataSubcription!:Subscription;
    UserSideBar = ['dashboard', 'user', 'supplier', 'product_purchase', 'order','logout'];

    constructor(public navigationService: NavigationService, public userService: UserService
        ,private authService:AuthService) {}

    ngOnInit() {
        this.authService.autoAuthUser();
        let sideBar: any = this.sideNavSections[1].items;
        this.userNavSections=[...this.sideNavSections];
        this.navigationDataSubcription=this.authService.getRoleStatusListener().subscribe((role: any) => {
            this.role=role;

            if (role === 'User') {
                this.userNavSections[1].items = this.UserSideBar.filter((element: any) => {
                    for (const i of sideBar) {
                        if (i === element) {
                            return i;
                        }
                    }
                })
            }

        })

    }

    ngDoCheck(): void {

        let sideBar: any = this.sideNavSections[1].items;
        this.userNavSections=[...this.sideNavSections];
        this.navigationDataSubcription=this.authService.getRoleStatusListener().subscribe((role: any) => {
            this.role=role;

            if (role === 'User') {
                this.userNavSections[1].items = this.UserSideBar.filter((element: any) => {
                    for (const i of sideBar) {
                        if (i === element) {
                            return i;
                        }
                    }
                })
            }

        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.navigationDataSubcription.unsubscribe();
    }
}
