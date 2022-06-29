import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TablesService } from "@modules/company/services";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector:'Company-Model',
    templateUrl:'./company-model.component.html',
    styleUrls:['./company-model.component.scss']
})
export class CompanyModelComponent implements OnInit{
    mode="create";
    title = 'datatables';
    userId:any;
    constructor(private tableServices:TablesService,
        private router:Router,
        private route:ActivatedRoute,
        private spinner: NgxSpinnerService
        ) { }
    companyForm:FormGroup=new FormGroup({
        company_name:new FormControl(''),
        company_short_name:new FormControl(''),
    })
    ngOnInit() {
        // this.tableServices.addCategory

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
              this.mode = 'edit';
              this.userId = paramMap.get('id');
              this.tableServices.getSingleCompany(this.userId).subscribe((postData:any) => {
                console.log(postData)
                this.companyForm?.patchValue({
                    company_name: postData.existingCompany.company_name,
                    company_short_name: postData.existingCompany.company_short_name
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
        this.tableServices.addCompany(this.companyForm.value).subscribe((res)=>{
            this.spinner.hide();
            this.router.navigate(['/company'])
        })
    }else{
        this.tableServices.editCompany(this.userId,this.companyForm.value).subscribe(()=>{
            this.router.navigate(['/company'])
            this.spinner.hide();

        });
    }

}





}
