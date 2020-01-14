import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient/patient.component';
import { AuthGuard } from './security/auth.guard';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';

export const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'home',
        component: HomeComponent,
        //canActivate:[AuthGuard],
        children: [
            { path: 'patient', component: PatientComponent },
            { path: 'patient-list', component: PatientListComponent }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: '/login' }
];