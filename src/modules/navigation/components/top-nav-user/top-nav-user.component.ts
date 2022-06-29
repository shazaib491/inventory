import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(public userService: UserService,private authService:AuthService) {}
    ngOnInit() {
        this.authService.autoAuthUser();
    }

    onLogout() {
        this.authService.logout();
      }
}
