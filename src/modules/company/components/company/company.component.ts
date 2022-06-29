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
import { TablesService } from '@modules/company/services';
import { SBSortableHeaderDirective, SortEvent } from '@modules/users/directives';
import { Country } from '@modules/users/models';
import { CountryService } from '@modules/users/services';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'sb-Company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
    companies = [];
    mode = "create";
    title = 'datatables';
    @ViewChild(DataTableDirective, { static: false })
    dtElement?: DataTableDirective;

    isDtInitialized: boolean = false;
    userId: any;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    count: any = 1;


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

        this.getCompany();
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

        this.tableService.changeCompanyStatus(id, status).subscribe((res) => {
            console.log(res)
            this.companies?.filter((elem: any) => {
                if (elem._id == id) {
                    return elem.company_status = status;
                }
            })

        })


    }

    getCompany() {
        this.tableService.getCompany().subscribe((rs: any) => {
            this.spinner.hide();

            this.companies = rs.companies;
            console.log(this.companies)
            this.companies.map((element: any) => {
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

    deleteCompany(id:any){
        this.tableService.deleteCompany(id).subscribe(()=>{
            this.companies=this.companies.filter((element:any)=>{
                return element._id!=id;
            })
        })
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();

    }
}
