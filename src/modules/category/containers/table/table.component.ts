import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services';
import { TablesService } from '@modules/category/services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    categories = [];
    userIsAuthenticated = false;
  private authListenerSubs?: Subscription;
  constructor(
    private authService:AuthService,
    private tableService:TablesService
    ) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
        isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        }
    );
    this.authService.autoAuthUser();
  }


}
