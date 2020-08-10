import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  private jwt: JwtHelperService = new JwtHelperService();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
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

    this.auth.logIn(this.loginForm.controls.username.value,
      this.loginForm.controls.password.value).subscribe((rsp) => {
        let user: User = this.extractUser(rsp.token);
        this.session.setTokenData(rsp);
        this.session.setUserData(user);
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

  extractUser(token: string): User {
    let user: User = new User();
    let jwtData = this.jwt.decodeToken(token);
    user.username = jwtData['username'];
    user.firstname = jwtData['firstname'];
    user.lastname = jwtData['lastname'];
    user.email = jwtData['email'];
    user.roles = jwtData['roles'];
    console.log(user);
    return user;
  }

}
