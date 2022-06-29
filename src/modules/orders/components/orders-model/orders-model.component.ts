import { Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TablesService } from "@modules/orders/services";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ActionSequence } from "protractor";

interface tax {
    tax_name: string;
    tax_percentage: number;
    totalTax: number;
}
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'Orders-Model',
    templateUrl: './orders-model.component.html',
    styleUrls: ['./orders-model.components.scss'],
})
export class OrdersModelComponent implements OnInit,DoCheck,OnDestroy {
    allProducts?: any[];
    products: any[] = [];
    customers?: any = {};
    orderItems!: [];
    defaultValue=1;
    tax: tax[] = [];
    mode = 'create';
    userId?: any;
    total = 0;
    gstSum = 0;
    totalPercentage?: number;
    orders!: {};
    printed=false;


    ordersForm: FormGroup = new FormGroup({
        buyer_name: new FormControl(''),
        product: new FormControl(''),
        item_purchase_quantity: new FormControl(1),
        gst: new FormControl(''),
        total: new FormControl('')
    });


    constructor(
        private tableService: TablesService,
        private router: Router,
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService
    ) {


    }








    ngOnInit() {


        this.spinner.show();
        this.tableService.allPurchaseProducts().subscribe((response: any) => {
            this.allProducts = response.orderProduct;
            this.tax = response.tax;
            this.spinner.hide();
        });






        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.mode = 'edit';
                this.userId = paramMap.get('id');
                this.tableService.editOrder(this.userId).subscribe(
                    (postData: any) => {
                        this.transformArray();
                        console.log(postData)
                        this.orderItems = postData.orders.ItemOrders;
                        this.ordersForm?.patchValue({
                            buyer_name: postData.orders.orders.buyer_name,
                        });
                    },
                    err => {
                    }
                );
            } else {
                this.mode = 'create';
            }
        });

        this.tableService.getOrders().subscribe(response => {});
    }
    transformArray() {
        this.orderItems?.forEach((element: any) => {
            this.ordersForm.patchValue({
                item_purchase_quantity: element.item_purchase_id.item_purchase_qty,
            });
        });
    }





    ngDoCheck(): void {
        this.products.forEach((element: any) => {
            if (this.ordersForm.value.product === element._id) {
                this.tax.forEach((element1: tax) => {
                    element1.totalTax =
                        element.item_purchase_quantity * element.item_sales_price_per_unit;
                });
                element.item_purchase_quantity = this.ordersForm.value.item_purchase_quantity;
            }
        });


    }











    addProduct(event: Event) {
        const singleProduct = this.allProducts?.find(
            (element: any) => element._id == this.ordersForm.value.product
        );
        singleProduct.quantityValue=1;
        var check=this.products.find(c => c._id === singleProduct._id);

        if(!check){
            this.products = [...this.products, singleProduct];

        }

    }

    calculation() {
        // tslint:disable-next-line: triple-equals
        if (this.mode == 'create') {
            this.total = this.products.reduce(
                (partialSum, a) =>
                    partialSum +
                    a.quantityValue * a.item_sales_price_per_unit,
                0
            );
        } else {
            this.total = this.orderItems?.reduce(
                (partialSum, a:any) =>
                    partialSum +
                    a.item_quantity *
                        a.item_purchase_id.item_sales_price_per_unit,
                0
            );
        }
        return this.total;
    }

    calculateGst() {
        this.gstSum = 0;
        this.tax.forEach(element => {
            element.totalTax = (this.total * element.tax_percentage) / 100;
            this.gstSum += (this.total * element.tax_percentage) / 100;
        });
        return this.gstSum;
    }

    onSubmit(event: any, task: any) {
        this.spinner.show();
        if(this.mode==="create"){
            this.orders = {
                buyer_name: this.ordersForm.value.buyer_name,
                order_tax_name: this.ordersForm.value.order_tax_name,
                order_total_amount: this.total,
                order_tax_percentage: this.gstSum,
                product: this.products,
            };
            this.tableService.addOrders(this.orders).subscribe(
                (response: any) => {
                    this.router.navigate(['/orders']);
                }
            );
        }else{
            this.orders = {
                buyer_name: this.ordersForm.value.buyer_name,
                order_tax_name: this.ordersForm.value.order_tax_name,
                order_total_amount: this.total,
                order_tax_percentage: this.gstSum,
                product: this.orderItems,
            };

            this.tableService.updateOrder(this.userId,this.orders).subscribe((response)=>{
                this.router.navigate(['/orders']);

            });
        }

    }

    ngOnDestroy(): void {
        this.mode = 'create';
    }


    // dynamic form

}

