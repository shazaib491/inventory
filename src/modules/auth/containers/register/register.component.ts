import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    constructor(private userService:UserService,
        private router:Router
        ) {}
    ngOnInit() {
        this.userService.IsmasterExist().subscribe((responseFromServer:any)=>{
            console.log(responseFromServer)
            if(responseFromServer.masterCheck){
                this.router.navigate(['/auth/login'])
            }
        })
    }
}
