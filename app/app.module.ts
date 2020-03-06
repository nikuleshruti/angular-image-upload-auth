import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderComponent } from './loader/loader.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersListComponent } from './users-list/users-list.component';

import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { LoaderService } from './loader.service';

import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { MatFileUploadModule } from '../lib/matFileUpload.module';
import { MatInputModule, MatFormFieldModule, MatSnackBarModule, MatButtonModule, MatCardModule,            MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTableModule,                        MatGridListModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule } 
         from '@angular/material';

import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
    CreateUserComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule, 
    MatFileUploadModule, 
    FormsModule, ReactiveFormsModule, RxReactiveFormsModule,
    MaterialFileInputModule,
    MatInputModule, MatFormFieldModule, MatSnackBarModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTableModule, MatGridListModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
