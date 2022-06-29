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
import { TablesService } from '@modules/purchase-management/services';
import { SBSortableHeaderDirective, SortEvent } from '@modules/users/directives';
import { Country } from '@modules/users/models';
import { CountryService } from '@modules/users/services';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'sb-Purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {



    @ViewChild(DataTableDirective, { static: false })
    dtElement?: DataTableDirective;
    isDtInitialized: boolean = false;
    userId: any;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    count: any = 1;
    products: any;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public countryService: CountryService,
        private tableService:TablesService,
        private changeDetectorRef: ChangeDetectorRef,
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
        this.getProduct();
        this.count++;
        this.dtTrigger.next();


    }

getProduct(){
    this.spinner.show();
    this.tableService.getTableProduct().subscribe((response:any)=>{
        this.products=response.products;
        console.log(this.products)
        this.spinner.hide();
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




    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();

    }



    changeStatus(id: any, status: any) {
        if (status === 'Enable')
            status = 'Disable';
        else
            status = 'Enable';
        this.tableService.changeProductStatus(id, status).subscribe((res) => {
            this.products?.filter((elem: any) => {
                if (elem._id == id) {
                    return elem.item_status = status;
                }
            })

        })


    }


    deleteProduct(id:any){
        this.tableService.deleteProduct(id).subscribe(()=>{
            this.products = this.products.filter((element: any) => {
                return element._id!=id;
            })
        })
    }



}
