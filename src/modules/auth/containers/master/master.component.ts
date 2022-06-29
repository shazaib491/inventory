import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserService } from '@modules/auth/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './master.component.html',
    styleUrls: ['master.component.scss'],
})
export class MasterComponent implements OnInit {
    isLoading=false;
    private authStatusSub?:Subscription;

    constructor(private authService:AuthService,private userService:UserService,
        private router:Router) {}

        ngOnInit() {
            this.userService.IsmasterExist().subscribe((responseFromServer:any)=>{
                if(responseFromServer.masterCheck){
                    this.router.navigate(['/auth/login'])
                }
            })

    }
    onRegister(form:NgForm){
        if(form.invalid){
          return;
        }
        this.isLoading=true;
        const user={
            user_name:form.value.user_name,
            user_email:form.value.user_email,
            user_password:form.value.user_password,
            user_type:"Master",
        }
        console.log(user)
        this.authService.createUser(user);
      }

      ngOnDestroy(){
      }
}
