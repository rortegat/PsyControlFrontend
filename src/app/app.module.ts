import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './app.material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './components/patient/patient/patient.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { PatientAddComponent } from './components/patient/patient-add/patient-add.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadComponent } from './components/file/file-upload/file-upload.component';
import { AuthInterceptor } from './security/auth.interceptor';
import { FileListComponent } from './components/file/file-list/file-list.component';
import { PatientEditComponent } from './components/patient/patient-edit/patient-edit.component';
import { ConsultComponent } from './components/consult/consult/consult.component';
import { ConsultAddComponent } from './components/consult/consult-add/consult-add.component';
import { HighLightSearchPipe } from './helpers/highLightSearch.pipe';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    HomeComponent,
    LoginComponent,
    PatientListComponent,
    PatientAddComponent,
    FileUploadComponent,
    FileListComponent,
    PatientEditComponent,
    ConsultComponent,
    ConsultAddComponent,
    HighLightSearchPipe,
    UserListComponent,
    UserAddComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
  entryComponents:[
    PatientAddComponent,
    PatientEditComponent,
    UserAddComponent,
    UserEditComponent
  ]
})
export class AppModule { }
