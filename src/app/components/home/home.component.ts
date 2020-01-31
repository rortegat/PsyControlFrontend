import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { AuthenticatedUser } from 'src/app/models/authenticated-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  public otherTheme: boolean=false
  public loading: boolean=false
  public userInfo: AuthenticatedUser=null
  public adminRole: boolean=false

  public mobileQuery: MediaQueryList = null
  private _mobileQueryListener: () => void


  constructor(
    private session:  SessionService,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.session.loading.subscribe(rsp=>this.loading=rsp)
    this.session.currentUser.subscribe((rsp)=>{
      this.userInfo=rsp
    })
   }

  ngOnInit() {

    this.userInfo.roles.forEach(role => {
      switch(role.rolename){
        case "ADMIN": this.adminRole=true; break;
      }
    })

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  changeTheme(){
    this.otherTheme=!this.otherTheme
  }

  logOut(){
    this.router.navigate(["login"])
    this.session.removeUserData()
  }

}
