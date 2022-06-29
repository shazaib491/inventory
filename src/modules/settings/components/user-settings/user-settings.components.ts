import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '@modules/auth/services';
import { TablesService } from '@modules/settings/services/tables.service';

@Component({
    selector:'sb-User-Settings',
    templateUrl:'user-settings.component.html',
    styleUrls:[]
})
export class UserSettingsComponent implements OnInit
{
    timezoneSelected?:any;
    currencySelected:any;
    timeZone?:any[];
    currency?:any[];
    storeId:any;
    constructor(private tableService:TablesService,
        private userService:UserService
        ){

    }
    storeForm: FormGroup = new FormGroup({
        store_name:new FormControl(''),
        store_address:new FormControl(''),
        store_contact_no:new FormControl(''),
        store_email_address:new FormControl(''),
        store_timezone:new FormControl(''),
        store_currency:new FormControl(''),
    });

    ngOnInit() {

        this.timeZone = this.userService.getRequest();
        this.currency = this.userService.getCurrency();

        this.tableService.getStoreDetail().subscribe((storeDetail:any)=>{
            console.log(storeDetail.store)
            let store=storeDetail.store[0];
            this.timezoneSelected=storeDetail.store[0].store_timezone;
            this.currencySelected=storeDetail.store[0].store_currency;
            this.storeId=storeDetail.store[0]._id;
            this.storeForm?.patchValue({
                'store_name': store.store_name,
                'store_address': store.store_address,
                'store_contact_no': store.store_contact_no,
                'store_email_address': store.store_email_address,
                'store_timezone': store.store_timezone,
                'store_currency': store.store_currency
              })
          });
        }


storeUpdated(){
    this.tableService.modifyStore(this.storeId,this.storeForm.value).subscribe((res)=>{
        console.log("store updated");
    })
}






}


