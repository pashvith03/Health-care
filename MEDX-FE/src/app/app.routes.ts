import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/sidebar/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FeaturesComponent } from './components/features/features.component';
import { CareunitComponent } from './components/careunit/careunit.component';
import { BedsComponent } from './components/beds/beds.component';
import { StafComponent } from './staff/staf.component';
import { FluidsComponent } from './fluids/fluids.component';
import { MedicationsComponent } from './medications/medications.component';
import { HospitalComponent } from './hospital/hospital.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomeComponent,
    },
    { path: 'registration', component: RegistrationComponent },
    { path: 'features', component: FeaturesComponent },
    {path:'careunit',component:CareunitComponent},
    {path:'beds',component:BedsComponent},
    {path:'staff',component:StafComponent},
    {path:'fluids',component:FluidsComponent},
    {path:'medications',component:MedicationsComponent},
    {path:'hospital',component:HospitalComponent},

    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
