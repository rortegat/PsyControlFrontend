import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { AuthenticatedUser } from 'src/app/models/authenticated-user';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('snav',{static: true}) navbar: MatSidenav
  
  public loading: boolean=false
  public userInfo: AuthenticatedUser=null
  public adminRole: boolean=false

  public panelOpenState: boolean = false
  public allExpandState = false
  public slideBool: boolean = false

  public mobileQuery: MediaQueryList = null
  private _mobileQueryListener: () => void

  constructor(
    private sessionService:  SessionService,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.sessionService.loading.subscribe(rsp=>this.loading=rsp)
    this.sessionService.currentUser.subscribe(rsp=>this.userInfo=rsp)
    this.sessionService.theme.subscribe(rsp=>this.slideBool=rsp)
   }

  ngOnInit() {

    this.navbar.open()

    this.userInfo.roles.forEach(role => {
      switch(role.rolename){
        case "ADMIN": this.adminRole=true; break;
      }
    })

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  changeTheme(): void{
    this.sessionService.changeTheme()
  }

  logOut(): void{
    this.router.navigate(["login"])
    this.sessionService.removeUserData()
  }

}
