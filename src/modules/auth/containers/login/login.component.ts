import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services';

@Component({
  selector: 'sb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form = new FormGroup({
        user_email: new FormControl('', [Validators.required, Validators.email]),
        user_password: new FormControl('', [Validators.required]),
      });

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

}

get f(){
    return this.form.controls;
  }

onLogin() {

    let loginCredential={
        user_email:this.form.value.user_email,
        user_password:this.form.value.user_password,
    }
    this.authService.login(loginCredential);
    console.log(loginCredential)
}

}

