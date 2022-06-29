import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { TablesService } from '@modules/tax/services';
import { SBSortableHeaderDirective, SortEvent } from '@modules/users/directives';
import { Country } from '@modules/users/models';
import { CountryService } from '@modules/users/services';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'sb-Tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit,OnDestroy {



    taxation = [];
    mode = "create";
    title = 'datatables';
    @ViewChild(DataTableDirective, { static: false })
    dtElement?: DataTableDirective;

    isDtInitialized: boolean = false;
    userId: any;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    count: any = 1;


    constructor(
        private tableService: TablesService,
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
        this.getTax();
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
            this.spinner.show();


        this.tableService.changeTaxStatus(id, status).subscribe((res) => {
            this.taxation?.filter((elem: any) => {
                if (elem._id == id) {
                    return elem.tax_status = status;
                }
            })
            this.spinner.hide();


        })


    }

    getTax() {
        this.tableService.getTax().subscribe((rs: any) => {
            this.spinner.hide();

            this.taxation = rs.taxation;
            console.log(this.taxation)
            this.taxation.map((element: any) => {
                element.createdAt = new Date(element.createdAt);
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

    deleteTax(id:any){
        this.spinner.show();

        this.tableService.deleteTax(id).subscribe(()=>{
            this.taxation=this.taxation.filter((element:any)=>{
                return element._id!=id;
            })
        })
        this.spinner.hide();

    }
    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();

    }

}
