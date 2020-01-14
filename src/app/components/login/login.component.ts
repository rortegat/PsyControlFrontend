import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public messageInfo: string
  public isLoading: boolean
  public loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService,
    private session: SessionService
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.isLoading = false
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    this.isLoading = true

    this.login.authenticate(
      this.loginForm.controls.user.value,
      this.loginForm.controls.password.value).subscribe(
        (rsp) => {
          console.log(rsp)
          this.session.setUserData(rsp)
          this.isLoading = false;
          this.router.navigate(["home"])
        },
        (err) => {
          console.log(err)
          this.messageInfo = err.error.message
          this.isLoading = false
        })
  }

}
