import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation, EmailValidation, RepeatPasswordValidator } from 'src/app/helpers/validators';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public messageInfo: string=""
  public isLoading: boolean
  public signUpForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService
  ) {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', PasswordValidation],
      confirmation: ['',Validators.required],
      email: ['', EmailValidation],
    },
    { validator: RepeatPasswordValidator })
  }

  ngOnInit() {
    this.isLoading = false
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return
    }
    //this.isLoading = true
    this.messageInfo = "Función no habilitada por el administrador"

    /*this.user.signUp(
      this.signUpForm.controls.username.value,
      this.signUpForm.controls.password.value,
      this.signUpForm.controls.email.value).subscribe(
        (rsp) => {
          this.isLoading = false
          this.router.navigate(["login"])
        },
        (err) => {
          this.messageInfo = "Error message"
          this.isLoading = false
        })*/
  }

}
