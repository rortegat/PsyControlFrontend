import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.messageInfo = "Contraseña incorrecta"
    this.isLoading = false
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.router.navigate(['home'])
    }, 3000)
  }

}
