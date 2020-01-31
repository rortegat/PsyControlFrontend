import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient/patient.component';
import { AuthGuard } from './security/auth.guard';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { ConsultAddComponent } from './components/consult/consult-add/consult-add.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { FileListComponent } from './components/file/file-list/file-list.component';
import { FileUploadComponent } from './components/file/file-upload/file-upload.component';
import { SignupComponent } from './components/signup/signup.component';

export const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'home',
        component: HomeComponent,
        canActivate:[AuthGuard],
        children: [
            { path: 'user-list', component: UserListComponent },
            { path: 'file-list', component: FileListComponent },
            { path: 'file-upload', component: FileUploadComponent },
            { path: 'patient/:id', component: PatientComponent },
            { path: 'patient-list', component: PatientListComponent },
            { path: 'consult-add/:id', component: ConsultAddComponent }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: '/login' }
];