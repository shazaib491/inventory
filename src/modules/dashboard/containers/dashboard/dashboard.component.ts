import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    userIsAuthenticated = false;
    private authListenerSubs?: Subscription;
    constructor(private authService:AuthService) {}
    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authService.autoAuthUser();
        this.authService.isAuthenticated=this.userIsAuthenticated
    }
}
