import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient/patient.component';

export const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [{
            path: 'patient', component: PatientComponent
        }]
    }
    //{ path: '**', pathMatch: 'full', redirectTo: '/' }
];