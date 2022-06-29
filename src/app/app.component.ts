import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '@modules/auth/services';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'sb-admin-angular';
    userIsAuthenticated = false;
  private authListenerSubs?: Subscription;
    constructor(public router: Router,
        private AuthService: AuthService,
        private titleService: Title) {
        this.router.events
            .pipe(filter(event => event instanceof ChildActivationEnd))
            .subscribe(event => {
                let snapshot = (event as ChildActivationEnd).snapshot;
                while (snapshot.firstChild !== null) {
                    snapshot = snapshot.firstChild;
                }
                this.titleService.setTitle(snapshot.data.title || 'SB Admin Angular');
            });
    }

    ngOnInit(): void {
        this.userIsAuthenticated = this.AuthService.getIsAuth();
        this.authListenerSubs = this.AuthService.getAuthStatusListener().subscribe(
            isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
            }
        );
        this.AuthService.autoAuthUser();
    }


    ngOnDestroy() {
        this.authListenerSubs?.unsubscribe();
      }
}
