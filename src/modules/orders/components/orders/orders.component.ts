import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablesService } from '@modules/orders/services';
import { SBSortableHeaderDirective, SortEvent } from '@modules/users/directives';
import { Country } from '@modules/users/models';
import { CountryService } from '@modules/users/services';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'sb-Orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit, OnDestroy {
    orders = [];
    mode = 'create';
    title = 'datatables';
    @ViewChild(DataTableDirective, { static: false })
    dtElement?: DataTableDirective;
    orderItems!: [];
    isDtInitialized = false;
    userId: any;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    count: any = 1;
    locationRk?: any;
    isPrintable = false;
    isArr: any;
    total: any;
    allProducts: any;
    tax: any;
    @ViewChild('print', { static: true }) print!: ElementRef;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService,
        private tableService: TablesService
    ) {
        if (this.isDtInitialized) {
            this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
            });
        } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();
        }
    }

    ngOnInit() {
        this.spinner.show();
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
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
        this.getOrders();
        this.dtTrigger.next();

        this.tableService.allPurchaseProducts().subscribe((response: any) => {
            this.allProducts = response.orderProduct;
            this.tax = response.tax;
            this.spinner.hide();
        });
    }

    getOrders() {
        this.tableService.getOrders().subscribe(
            (response: any) => {
                this.spinner.hide();

                console.log(response);
                this.orders = response.orders;
                if (this.isDtInitialized) {
                    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
                        dtInstance.destroy();
                        this.dtTrigger.next();
                    });
                } else {
                    this.isDtInitialized = true;
                    this.dtTrigger.next();
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    deleteOrder(id: any) {
        this.tableService.deleteOrders(id).subscribe(() => {
            this.orders = this.orders.filter((element: any) => {
                return element._id != id;
            });
        });
    }

    onPrint(id: string) {
        this.tableService.editOrder(id).subscribe((postData: any) => {
            this.isPrintable = true;
            console.log(postData);
            this.orderItems = postData.orders.ItemOrders;
            console.log(this.orderItems);
            this.isArr = postData?.orders?.orders;
            this.isArr.order_tax_percentage=parseFloat(this.isArr.order_tax_percentage);
            setTimeout(() => {
                this.print.nativeElement.click();
                this.isPrintable = false;
            });
        });
    }



    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
}
