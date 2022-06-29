import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { TablesService } from '@modules/users/services/tables.service';
import { User } from '@modules/users/models';
import { CountryService } from '@modules/users/services';
import { Observable, Subject } from 'rxjs';
import $ from "jquery";
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'sb-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    title = 'datatables';
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    allUser?: User[];
    count=0;
    constructor(
        public countryService: CountryService,
        private tableService: TablesService,
        private spinner:NgxSpinnerService
    ) { }

    ngOnInit() {
        this.spinner.show();
        this.getUser();
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
        };
        this.count++;
        this.dtTrigger.next();

    }

    ngAfterViewInit(): void {

    }

    getUser() {
        this.tableService.getUsers$().subscribe((response: any) => {
            this.allUser = response.allUser;
            this.dtTrigger.next();
            this.spinner.hide();
        });
    }


    changeStatus(id: any, status: any) {
        if (status === 'Enable')
            status = 'Disable'
        else
            status = 'Enable'
        this.spinner.show();

        this.tableService.changeUserStatus(id, status).subscribe((res) => {
            this.allUser?.filter((elem: any) => {
                if (elem._id == id) {
                    return elem.user_status = status;
                }
            })
        this.spinner.hide();

        })


    }

    deleteSingleUser(id:any){
        this.spinner.show();
        this.tableService.deleteUser(id).subscribe((res)=>{
            this.allUser=this.allUser?.filter((user:any)=>user._id!=id);
            this.spinner.hide()
        })
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
        }
}
