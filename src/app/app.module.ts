import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './app.material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './components/patient/patient/patient.component';
import { HomeComponent } from './components/home/home.component';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxChartsModule, PieChartModule, NumberCardModule } from '@swimlane/ngx-charts';
import { NgxFileDropModule } from 'ngx-file-drop';

import { FileUploadComponent } from './components/file/file-upload/file-upload.component';
import { AuthInterceptor } from './security/auth.interceptor';
import { FileListComponent } from './components/file/file-list/file-list.component';
import { PatientFormComponent } from './components/patient/patient-form/patient-form.component';
import { ConsultListComponent } from './components/consult/consult-list/consult-list.component';
import { ConsultAddComponent } from './components/consult/consult-add/consult-add.component';
import { HighLightSearchPipe } from './helpers/highLightSearch.pipe';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserFormComponent } from './components/user/user-edit/user-form.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ServerErrorComponent } from './components/modal/server-error/server-error.component';
import { ApplicationErrorComponent } from './components/modal/application-error/application-error.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ConsultEditComponent } from './components/consult/consult-edit/consult-edit.component'
import { OverlayContainer } from '@angular/cdk/overlay';
import { SessionService } from './services/session.service';
import { ApplicationInfoComponent } from './components/modal/application-info/application-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoleListComponent } from './components/role/role-list/role-list.component';
import { RoleFormComponent } from './components/role/role-form/role-form.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { AuthImagePipe } from './security/auth-image.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PatientComponent,
    PatientFormComponent,
    PatientListComponent,
    FileUploadComponent,
    FileListComponent,
    ConsultListComponent,
    ConsultAddComponent,
    HighLightSearchPipe,
    AuthImagePipe,
    UserListComponent,
    UserFormComponent,
    UserAddComponent,
    SignupComponent,
    ServerErrorComponent,
    ApplicationErrorComponent,
    ConsultEditComponent,
    ApplicationInfoComponent,
    DashboardComponent,
    RoleListComponent,
    RoleFormComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NgxChartsModule,
    NgxFileDropModule,
    PieChartModule,
    NumberCardModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule
  ],
  providers: [
    HighLightSearchPipe,
    Validators,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PatientFormComponent,
    UserFormComponent,
    UserAddComponent,
    RoleFormComponent,
    ServerErrorComponent,
    ApplicationErrorComponent,
    ApplicationInfoComponent
  ]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer, sessionService: SessionService) {
    sessionService.theme.subscribe(rsp => {
      if (rsp)
        overlayContainer.getContainerElement().classList.add("alternative")
      else
        overlayContainer.getContainerElement().classList.remove("alternative")
    })

  }
}
