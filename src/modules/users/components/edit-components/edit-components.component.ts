import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TablesService } from '@modules/users/services/tables.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'sb-edit-components',
  templateUrl: './edit-components.component.html',
  styleUrls: ['./edit-components.component.scss']
})
export class EditComponentsComponent implements OnInit {
    submitted = false;
    mode="create";
    userId:any;
    form = new FormGroup({
        user_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        user_email: new FormControl('', [Validators.required, Validators.email]),
      });
  constructor(
    private tableService:TablesService,
    public route: ActivatedRoute,
    private router:Router
    ) { }

    get f(){
        return this.form.controls;
      }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.mode = 'edit';
          this.userId = paramMap.get('id');
          this.tableService.getSingleUser(this.userId).subscribe((postData:any) => {
            console.log(postData)
            this.form?.patchValue({
                "user_name": postData.user.user_name,
                "user_email": postData.user.user_email
              })
          });
        } else {
          this.mode = 'create';
        }
      });
  }


  onSubmit(){
    console.log(this.form.invalid)
    // if(this.form.invalid){
    //     return ;
    // }
    let userData={
        user_name:this.form.value.user_name,
        user_email:this.form.value.user_email
    }

    if(this.mode=='create'){
        this.tableService.addUser(userData).subscribe((response)=>{
            this.router.navigate(['/users']);

        })
    }else{
        console.log(this.userId)
        this.tableService.updateSingleUser(this.userId,userData).subscribe((res)=>{
            this.router.navigate(['/users']);
        });


    }
    this.form.reset();


  }

}
