import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TablesService } from "@modules/purchase-management/services/tables.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinner, NgxSpinnerService } from "ngx-spinner";
@Component({
    selector: 'Purchase-Model',
    templateUrl: './purchase-model.component.html',
    styleUrls: ['./purchase-model.component.scss'],
})
export class PurchaseModelComponent implements OnInit {
    products: [] = [];
    mode="create";
    userId:any;
    productForm: FormGroup = new FormGroup({
        item_name: new FormControl(''),
        item_manufactured: new FormControl(''),
        item_category: new FormControl(''),
        item_localtion_rack: new FormControl(''),
        item_avialable_quantity: new FormControl(''),
    });
    constructor(private tableService: TablesService,
        private spinner:NgxSpinnerService,
        private router:Router,
        private route:ActivatedRoute
        ) {}
    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
              this.mode = 'edit';
              this.userId = paramMap.get('id');
              this.tableService.getSingleProduct(this.userId).subscribe((postData:any) => {
                console.log(postData)
                this.productForm?.patchValue({
                    item_name:postData.product.item_name,
                    item_manufactured:postData.product.item_manufactured,
                    item_category:postData.product.item_category,
                    item_localtion_rack:postData.product.item_localtion_rack,
                    item_avialable_quantity:postData.product.item_avialable_quantity,
                  })
              });
            } else {
              this.mode = 'create';
            }
          });




        this.tableService.allProduct().subscribe(
            (response: any) => {
                this.products = response.details;
                console.log(this.products);
            },
            err => {
                console.log(err);
            }
        );
    }

    onSubmit() {
        this.spinner.show();
        if(this.mode=='create'){
            this.tableService.addProduct(this.productForm.value).subscribe(
                response => {
                    console.log(response);
                    this.router.navigate(['/product']);
                    this.spinner.hide();

                },
                err => {
                    console.log(err);
                }
            );
        }else{
            this.tableService.editProduct(this.userId,this.productForm.value).subscribe(
                response => {
                    console.log(response);
                    this.router.navigate(['/product']);
                    this.spinner.hide();

                },
                err => {
                    console.log(err);
                }
            );
        }

    }
}
