import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TablesService } from "@modules/purchase-product/services";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector:'Purchase-Product-Model',
    templateUrl:'./purchase-product-model.component.html',
    styleUrls:['./purchase-product-model.component.scss']
})
export class PurchaseProductModelComponent implements OnInit{
    purchaseProduct:any;
    mode="create";
    userId:any;
    purchaseProductForm:FormGroup=new FormGroup({
        item_id:new FormControl(''),
        supplier_id:new FormControl(''),
        item_batch_no:new FormControl(''),
        item_purchase_qty:new FormControl(''),
        item_purchase_price_per_unit:new FormControl(''),
        item_manufacturer_month:new FormControl(''),
        item_manufacturer_year:new FormControl(''),
        item_expire_month:new FormControl(''),
        item_expire_year:new FormControl(''),
        item_sales_price_per_unit:new FormControl(''),
    })
    constructor(
        private tableService:TablesService,
        private router:Router,
        private route:ActivatedRoute,
        private spinner: NgxSpinnerService
        ) { }
    ngOnInit() {
        this.allPurchaseProduct();

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
              this.mode = 'edit';
              this.userId = paramMap.get('id');
              this.tableService.getSinglePurchaseProduct(this.userId).subscribe((postData:any) => {
                let purchase=postData.purchaseProduct;
                console.log(purchase)
                this.purchaseProductForm?.patchValue({
                    item_id:purchase.item_id,
                    supplier_id:purchase.supplier_id,
                    item_batch_no:purchase.item_batch_no,
                    item_purchase_qty:purchase.item_purchase_qty,
                    item_purchase_price_per_unit:purchase.item_purchase_price_per_unit,
                    item_manufacturer_month:purchase.item_manufacturer_month,
                    item_manufacturer_year:purchase.item_manufacturer_year,
                    item_expire_month:purchase.item_expire_month,
                    item_expire_year:purchase.item_expire_year,
                    item_sales_price_per_unit:purchase.item_sales_price_per_unit
                  })
              });
            } else {
              this.mode = 'create';
            }
          });
    }

    allPurchaseProduct(){
        this.tableService.getPurchaseProduct().subscribe((response:any)=>{
            this.purchaseProduct=response.purchaseItem;
        })
    }


    onSubmit(){
        this.spinner.show();
        if(this.mode=="create"){
            this.tableService.addProduct(this.purchaseProductForm.value).subscribe((response)=>{
                console.log(response);
                this.spinner.hide();
                this.router.navigate(['/purchase-product']);
            },err=>{
                this.spinner.hide();

            })
        }else{
            console.log()
            this.tableService.editPurchaseProduct(this.userId,this.purchaseProductForm.value).subscribe((response)=>{
                this.spinner.hide();

                this.router.navigate(['/purchase-product']);
                this.mode="create";
            },err=>{
                this.spinner.hide();

            })
        }

        // this.tableService.
    }
}
