import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-forgot-password',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    constructor(private userService:UserService) {}

    forgotUserPassword:FormGroup=new FormGroup({
        user_email:new FormControl('')
    })
    ngOnInit() {}

    sendForForgot(){
        this.userService.forgotUserPassword(this.forgotUserPassword.value).subscribe((res)=>{
            console.log(res)
        })
    }
}
