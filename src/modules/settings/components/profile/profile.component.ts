import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SBSortableHeaderDirective, SortEvent } from '@modules/users/directives';
import { Country } from '@modules/users/models';
import { TablesService } from '@modules/settings/services/tables.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    @Input() pageSize = 4;



    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private tableService:TablesService,
        private router:Router
    ) {}
    forgotForm:FormGroup=new FormGroup({
        user_name:new FormControl(''),
        user_email:new FormControl(''),
        user_password:new FormControl('')
    })
    ngOnInit() {
        this.tableService.modifyMaster().subscribe((res:any)=>{
            console.log(res);
            this.forgotForm.patchValue({
                user_name:res.existingMaster.user_name,
                user_email:res.existingMaster.user_email,
                user_password:res.existingMaster.user_password
            })
        })
    }


    editUser(){
        this.tableService.modifyMasterDetail(this.forgotForm.value).subscribe((res)=>{
            this.router.navigate(['/dashboard']);
        })
    }


}
