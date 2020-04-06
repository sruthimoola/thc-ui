import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import {FieldsetModule} from 'primeng/fieldset';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuCompComponent } from './menu-comp/menu-comp.component';
import { HomeCompComponent } from './menu-comp/home-comp/home-comp.component';
import { SearchCompComponent } from './menu-comp/search-comp/search-comp.component';
import { PatientCheckinCompComponent } from './menu-comp/patient-checkin-comp/patient-checkin-comp.component';
import { ContactCompComponent } from './menu-comp/contact-comp/contact-comp.component';
import { PatientService } from './patient.service';
import { DataStorageService } from './shared/data-storage.service';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuCompComponent,
    HomeCompComponent,
    SearchCompComponent,
    PatientCheckinCompComponent,
    ContactCompComponent,
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    FieldsetModule

  ],
  providers: [PatientService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
