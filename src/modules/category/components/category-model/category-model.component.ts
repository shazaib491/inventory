import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TablesService } from "@modules/category/services/tables.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector:'Category-Model',
    templateUrl:'./category-model.component.html',
    styleUrls:['./category-model.component.scss']
})
export class CategoryModelComponent implements OnInit{
    mode="create";
    title = 'datatables';
    userId:any;
    constructor(private tableServices:TablesService,
        private router:Router,
        private route:ActivatedRoute,
        private spinner: NgxSpinnerService
        ) { }
    categoryForm:FormGroup=new FormGroup({
        category_name:new FormControl('')
    })
    ngOnInit() {
        // this.tableServices.addCategory

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
              this.mode = 'edit';
              this.userId = paramMap.get('id');
              this.tableServices.getSingleCategory(this.userId).subscribe((postData:any) => {
                console.log(postData)
                this.categoryForm?.patchValue({
                    "category_name": postData.category.category_name,
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
        this.tableServices.addCategory(this.categoryForm.value).subscribe((res)=>{
            this.spinner.hide();
            this.router.navigate(['/category'])
        })
    }else{
        this.tableServices.editCategory(this.userId,this.categoryForm.value).subscribe(()=>{
            this.router.navigate(['/category'])
            this.spinner.hide();

        });
    }

}





}
