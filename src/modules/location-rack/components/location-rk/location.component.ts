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
import { ActivatedRoute } from '@angular/router';
import { SBSortableHeaderDirective, SortEvent } from '@modules/users/directives';
import { Country } from '@modules/users/models';
import { CountryService } from '@modules/users/services';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { TablesService} from "./../../services/tables.service"
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'sb-Location-rk',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

    categories = [];
    mode = "create";
    title = 'datatables';
    @ViewChild(DataTableDirective, { static: false })
    dtElement?: DataTableDirective;

    isDtInitialized: boolean = false;
    userId: any;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    count: any = 1;
    locationRk?: any;


        constructor(private tableService: TablesService,
            private route: ActivatedRoute,
            private spinner: NgxSpinnerService

        ) {

        if (this.isDtInitialized) {
            this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
            });
        } else {
            this.isDtInitialized = true
            this.dtTrigger.next();
        }

    }
    ngOnInit() {
        this.spinner.show();
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true
        };
        if (this.isDtInitialized) {
            this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
            });
        } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();
        }

        this.getlocationRk();
        this.count++;
        this.dtTrigger.next();

    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }
    changeStatus(id: any, status: any) {
        if (status === 'Enable')
            status = 'Disable'
        else
            status = 'Enable'

        this.tableService.changeLocationRkStatus(id, status).subscribe((res) => {
            console.log(res)
            this.locationRk?.filter((elem: any) => {
                if (elem._id == id) {
                    return elem.location_rack_status = status;
                }
            })

        })


    }

    getlocationRk() {
        this.tableService.getLocationRk().subscribe((rs: any) => {
            this.spinner.hide();
            this.locationRk = rs.locationRk;
            this.categories.map((element: any) => {
                element.date = new Date(element.createdAt);
            })
            if (this.isDtInitialized) {
                this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.destroy();
                    this.dtTrigger.next();
                });
            } else {
                this.isDtInitialized = true
                this.dtTrigger.next();
            }
        })
    }

    deleteLocationRk(id:any){
        this.tableService.deleteLocationRk(id).subscribe(()=>{
            this.locationRk=this.locationRk.filter((element:any)=>{
                return element._id!=id;
            })
        })
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();

    }
}
