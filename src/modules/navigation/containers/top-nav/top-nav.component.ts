import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {

    constructor(private navigationService: NavigationService,private authService:AuthService) {}
    ngOnInit() {
        this.authService.autoAuthUser();
    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}
