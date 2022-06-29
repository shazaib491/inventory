import { Component, EventEmitter, OnInit, Output, SimpleChange, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CountryService } from "@modules/supplier/services";
import { TablesService } from "@modules/supplier/services/tables.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector:'Supplier-Model',
    templateUrl:'./supplier-model.component.html',
    styleUrls:['./supplier-model.component.scss']
})
export class SupplierModelComponent implements OnInit{
    closeResult = '';
    @Output() eventContent = new EventEmitter<string>();
    @ViewChild('content', { read: TemplateRef }) modalContent?:TemplateRef<any>;
    mode='create';
    userId:any;
    // let content=new Subject()
    openMethod?:any;
    supplierForm:FormGroup=new FormGroup({
        supplier_name:new FormControl(''),
        supplier_email:new FormControl(''),
        supplier_address:new FormControl(''),
        supplier_contact_no:new FormControl('')
    })
    constructor(
        private modalService: NgbModal,
        private tableService:TablesService,
        private countryService:CountryService
        )
        { }


    ngOnInit() {
        this.tableService.callForParent.subscribe((id:string)=>{
            this.mode="edit";
            this.userId=id;
            if(this.userId){
                this.tableService.getSingleRecord(id).subscribe((res:any)=>{
                    this.userId=res.supplier._id;
                    this.supplierForm.patchValue({
                        supplier_name:res.supplier.supplier_name,
                        supplier_email:res.supplier.supplier_email,
                        supplier_address:res.supplier.supplier_address,
                        supplier_contact_no:res.supplier.supplier_contact_no
                    })
                this.modalService.open(this.modalContent,{centered:true})


                })
            }


        })
    }
    open(content: any) {
        this.supplierForm.reset();
        this.mode="create";
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered:true}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;

        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
        this.supplierForm.reset();

          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        this.supplierForm.reset();

          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }


      onSubmit(){
        if(this.mode=="create"){
            this.tableService.addSupplier(this.supplierForm.value).subscribe((_)=>{
                this.countryService.getDataFromServer();
                // this.tableService.callForParent.next();
                this.modalService.dismissAll();
            })
        }else{
            this.tableService.editSupplier(this.userId,this.supplierForm.value).subscribe((_)=>{
                this.countryService.getDataFromServer();
                // this.tableService.callForParent.next();
                this.modalService.dismissAll();
                this.mode="create";
            })

        }
        this.supplierForm.reset();

      }


}
