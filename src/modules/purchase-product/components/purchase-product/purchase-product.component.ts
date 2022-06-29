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
import { TablesService } from '@modules/purchase-product/services';
import { SBSortableHeaderDirective, SortEvent } from '@modules/users/directives';
import { Country } from '@modules/users/models';
import { CountryService } from '@modules/users/services';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'sb-Purchase-Product',
  templateUrl: './purchase-product.component.html',
  styleUrls: ['./purchase-product.component.scss']
})
export class PurchaseProductComponent implements OnInit {
    @ViewChild(DataTableDirective, { static: false })
    dtElement?: DataTableDirective;
    isDtInitialized: boolean = false;
    userId: any;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    count: any = 1;
    purchaseProducts:any;
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        private tableService:TablesService,
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
        this.getPurchasedProducts();
    }
    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }


getPurchasedProducts(){
    this.spinner.show();
    this.tableService.getPurchaseProducts().subscribe((response:any)=>{
        this.purchaseProducts=response.purchaseProduct;
        console.log(this.purchaseProducts)
        this.purchaseProducts.map((element:any)=>{
            element.createdAt=new Date(element.createdAt)
        })
        this.spinner.hide();
        if (this.isDtInitialized) {
            this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
            });
        } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();
        }
    })
}


changeStatus(id: any, status: any) {
    if (status === 'Enable')
        status = 'Disable';
    else
        status = 'Enable';
        this.spinner.show();

    this.tableService.changePurchaseProductStatus(id, status).subscribe((res) => {
        this.purchaseProducts?.filter((elem: any) => {
            if (elem._id == id) {
                return elem.item_status = status;
            }
        this.spinner.hide();


        })

    })


}


deletePurchaseProduct(id:any){
    this.spinner.show();

    this.tableService.deletePurchaseProduct(id).subscribe(()=>{
        this.purchaseProducts = this.purchaseProducts.filter((element: any) => {
            return element._id!=id;
        })
        this.spinner.hide();

    })
}


    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();

    }


}
