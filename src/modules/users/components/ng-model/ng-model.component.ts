import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TablesService } from "@modules/users/services/tables.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector:'Ng-Model',
    templateUrl:'./ng-model.component.html',
    styleUrls:['./ng-model.component.scss']
})
export class NgModelComponent implements OnInit{
    closeResult = '';
    @Input() userId:any;
    @Input() mode:any="insert";
         constructor(private modalService: NgbModal,private tableService:TablesService) { }

         ngOnChanges(changes: SimpleChanges): void {
            if(changes.currentValue){
                this.tableService.getSingleUser(changes.currentValue).subscribe((res:any)=>{
                    console.log(res)
                })
            }

         }
    ngOnInit() {

    }

    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered:true}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }





  onSubmit(data:NgForm){
    console.log(data.invalid)
    if(data.invalid){
        return ;
    }
    let userData={
        user_name:data.value.user_name,
        user_email:data.value.user_email
    }
    data.reset();
    this.tableService.addUser(userData).subscribe((response)=>{
        console.log(response);
    })

  }
}
