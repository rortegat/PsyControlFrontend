import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public messageInfo: string=""
  public isLoading: boolean
  public loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService,
    private session: SessionService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.isLoading = false
  }

  createAccount(){
    this.router.navigate(['signup'])
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    this.isLoading = true

    this.user.logIn(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value).subscribe(
        (rsp) => {
          this.session.setUserData(rsp)
          this.isLoading = false;
          this.router.navigate(["home"])
        },
        (err) => {
          if(err.error.message!="")
          this.messageInfo = err.error.message
          else
          this.messageInfo="Error, contacte a un administrador"
          this.isLoading = false
        })
  }

}
