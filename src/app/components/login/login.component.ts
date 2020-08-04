import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public messageInfo: string = "";
  public isLoading: boolean = false;
  public loginForm: FormGroup;
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home/dashboard';
    if (this.session.getUserData() != null)
      this.router.navigate([this.returnUrl]);
    console.log(this.returnUrl);
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createAccount(): void {
    this.router.navigate(['signup'])
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.loginForm.disable();

    this.user.logIn(this.loginForm.controls.username.value,
      this.loginForm.controls.password.value).subscribe((rsp) => {
        this.session.setUserData(rsp);
        this.isLoading = false;
        this.router.navigate([this.returnUrl]);
      },
        (err) => {
          this.loginForm.enable();
          if (err.error.message != "")
            this.messageInfo = err.error.message;
          else
            this.messageInfo = "Error, contacte a un administrador";
          this.isLoading = false;
        });
  }

}
