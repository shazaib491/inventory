import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { TablesService } from "@modules/location-rack/services";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector:'Location-Model',
    templateUrl:'./location-model.component.html',
    styleUrls:['./location-model.component.scss']
})
export class LocationModelComponent implements OnInit{
    mode="create";
    title = 'datatables';
    userId:any;
    constructor(private tableServices:TablesService,
        private router:Router,
        private route:ActivatedRoute,
        private spinner: NgxSpinnerService

        ) { }
    locationForm:FormGroup=new FormGroup({
        location_rack_name:new FormControl('')
    })
    ngOnInit() {
        // this.tableServices.addCategory
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
              this.mode = 'edit';
              this.userId = paramMap.get('id');
              this.tableServices.getSinglelLocationRk(this.userId).subscribe((postData:any) => {
                console.log(postData)
                this.locationForm?.patchValue({
                    location_rack_name: postData.locationRk.location_rack_name,
                  })
              });
            } else {
              this.mode = 'create';
            }
          });
    }

onSubmit(){
    if(this.mode=='create'){
        this.tableServices.addLocationRk(this.locationForm.value).subscribe((res)=>{
            this.router.navigate(['/location'])
        })
    }else{
        this.tableServices.editLocationRk(this.userId,this.locationForm.value).subscribe(()=>{
            this.router.navigate(['/location'])
        });
    }

}





}
