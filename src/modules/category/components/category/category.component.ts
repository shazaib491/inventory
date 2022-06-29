import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { TablesService } from '@modules/category/services/tables.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'sb-cateogry',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
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

        this.getCategory();
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

        this.tableService.changeCategoryStatus(id, status).subscribe((res) => {
            console.log(res)
            this.categories?.filter((elem: any) => {
                if (elem._id == id) {
                    return elem.category_status = status;
                }
            })

        })


    }

    getCategory() {
        this.tableService.getCategory().subscribe((rs: any) => {
            this.spinner.hide();

            this.categories = rs.categories;
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

    deleteCategory(id:any){
        this.tableService.deleteCategory(id).subscribe(()=>{
            this.categories=this.categories.filter((element:any)=>{
                return element._id!=id;
            })
        })
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();

    }
}
