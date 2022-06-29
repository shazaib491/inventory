import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TablesService } from "@modules/tax/services";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector:'Tax-Model',
    templateUrl:'./tax-model.component.html',
    styleUrls:['./tax-model.component.scss']
})
export class TaxModelComponent implements OnInit{
    mode = 'create';
    userId:any;
    taxForm:FormGroup=new FormGroup({
        tax_name:new FormControl(''),
        tax_percentage:new FormControl('')
    })
    constructor(private route:ActivatedRoute,
            private router:Router,
            private tableService:TablesService,
        private spinner: NgxSpinnerService

        ) { }

    ngOnInit() {

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
              this.mode = 'edit';
              this.userId = paramMap.get('id');
              this.tableService.getSingleTax(this.userId).subscribe((postData:any) => {
                console.log(postData)
                this.taxForm?.patchValue({
                    tax_name: postData.existingTax.tax_name,
                    tax_percentage: postData.existingTax.tax_percentage
                  })
              });
            } else {
              this.mode = 'create';
            }
          });
    }

onSubmit(){
    this.spinner.show();
    if(this.mode=='create'){
        this.tableService.addTax(this.taxForm.value).subscribe((res)=>{
            this.spinner.hide();
            this.router.navigate(['/tax'])
        })
    }else{
        this.tableService.editTax(this.userId,this.taxForm.value).subscribe(()=>{
            this.router.navigate(['/tax'])
            this.spinner.hide();

        });
    }

}





}
