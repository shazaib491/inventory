import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
    timeZone?: any;
    curreny: any;
    storeForm:FormGroup=new FormGroup({
        store_name:new FormControl(''),
        store_address:new FormControl(''),
        store_contact_no:new FormControl(''),
        store_email_address:new FormControl(''),
        store_timezone:new FormControl(''),
        store_currency:new FormControl(''),
    });
    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.timeZone = this.userService.getRequest();
        this.curreny = this.userService.getCurrency();
    }
    saveStore() {
        this.userService.addStore(this.storeForm.value).subscribe(
            response => {
                this.router.navigate(['/auth/login']);
            },
            err => {
            }
        );
    }
}
