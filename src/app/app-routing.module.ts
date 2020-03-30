import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeCompComponent } from './menu-comp/home-comp/home-comp.component';
import { SearchCompComponent } from './menu-comp/search-comp/search-comp.component';
import { PatientCheckinCompComponent } from './menu-comp/patient-checkin-comp/patient-checkin-comp.component';
import { ContactCompComponent } from './menu-comp/contact-comp/contact-comp.component';



const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeCompComponent},
    { path: 'search-patient', component: SearchCompComponent},
    { path: 'patient-checkin', component: PatientCheckinCompComponent},
    { path: 'contact', component: ContactCompComponent}

];

@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule {

}
