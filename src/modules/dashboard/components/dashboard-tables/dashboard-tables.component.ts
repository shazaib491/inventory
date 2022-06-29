import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-dashboard-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-tables.component.html',
    styleUrls: ['dashboard-tables.component.scss'],
})
export class DashboardTablesComponent implements OnInit {
    constructor(private authService:AuthService) {}
    ngOnInit() {
        this.authService.autoAuthUser();
    }

}
