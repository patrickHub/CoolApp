import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { AuthComponent } from './auth/auth.component';
import { authRoutes } from './auth/auth.routing';

import {EqualPasswordValidatorService} from './equal-password-validator.service';
import {EmailValidatorService} from './email-validator.service';
import {ApiService} from './api.service';
import {AlertService} from './alert.service';
import {AuthService} from './auth.service';
import{ SocketService } from './socket.service'
import { AuthGuardService } from './auth-guard.service';
import {ModalModule} from "ng2-modal";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    QuestionComponent,
    ResultComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule,
    RouterModule.forRoot([
       {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
      },
      { 
        path: 'register', 
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      } ,
      ...authRoutes

    ])
  ],
  providers: [[EqualPasswordValidatorService, EmailValidatorService, AlertService, ApiService, AuthService, AuthGuardService, SocketService],],
  bootstrap: [AppComponent]
})
export class AppModule { }
