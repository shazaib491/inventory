import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-dashboard-charts',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-charts.component.html',
    styleUrls: ['dashboard-charts.component.scss'],
})
export class DashboardChartsComponent implements OnInit {
    constructor(private authService:AuthService) {}
    ngOnInit() {
        this.authService.autoAuthUser();
    }
}
