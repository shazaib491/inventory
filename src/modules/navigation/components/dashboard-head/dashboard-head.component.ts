import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-dashboard-head',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-head.component.html',
    styleUrls: ['dashboard-head.component.scss'],
})
export class DashboardHeadComponent implements OnInit {
    @Input() title!: string;
    @Input() hideBreadcrumbs = false;

    constructor(private authService:AuthService) {}
    ngOnInit() {

        this.authService.autoAuthUser();

    }
}
